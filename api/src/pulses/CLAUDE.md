# pulses Module

## Status Machine
draft → active → closed. No skipping. No reverting.
Sending a pulse transitions draft → active.
Invalid transitions: throw BadRequestException with errorCode PULSE_INVALID_STATUS_TRANSITION.

## Magic Links
Generated in MagicLinksService. Signed with HMAC-SHA256 using MAGIC_LINK_SECRET.
Single-use: first redemption marks the token in Redis.
Token payload: { userId, pulseId, expiresAt } — no other fields.
Expiry: 24 hours from generation.

## Anonymization Contract (CRITICAL)
User IDs NEVER stored in pulse_responses. Hash before write.
PulseResponseRepository.save() does the hashing — do not bypass it.

## Events
Emit pulse.submitted via EventEmitter2 when a pulse is sent.
Do NOT call NotificationsService directly from pulses module.
