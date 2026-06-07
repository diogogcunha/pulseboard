---
applyTo: "api/src/pulses/**"
---

# pulses Module Conventions

<!-- WHY THIS FILE EXISTS: The pulses module is the core domain. Its status machine
     and anonymization boundary must be enforced consistently. Without this file,
     an agent might store raw user IDs in pulse_responses or skip the status validation. -->

## Pulse Status Machine
Valid states: `draft` → `active` → `closed`.
Only valid transitions:
- `draft` → `active`: triggered by `POST /api/v1/pulses/:id/send`
- `active` → `closed`: triggered manually or by expiry job
Invalid transitions must throw `BadRequestException` with errorCode `PULSE_INVALID_STATUS_TRANSITION`.

## Magic Links
Generated in `MagicLinksService`. Signed with HMAC-SHA256 using `MAGIC_LINK_SECRET`.
Single-use: first redemption marks the token as used in Redis.
Token payload: `{ userId, pulseId, expiresAt }` — no other fields.
Expiry: 24 hours from generation.

## Anonymization Contract (CRITICAL)
User IDs must NEVER be stored in `pulse_responses`.
`PulseResponseRepository.save()` hashes the userId one-way before persisting.
This is enforced in the repository layer — do not bypass it.

## Events (not direct calls)
When a pulse is sent, emit `pulse.submitted` event via EventEmitter2.
The notifications module listens to this event. Do not call NotificationsService directly.

## Templates
`POST /api/v1/pulse-templates/:id/clone` creates a new pulse (not a template copy) — the
result is a draft pulse pre-filled with the template's question and responseType.
