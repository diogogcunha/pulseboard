---
applyTo: "api/src/users-auth/**"
---

# users-auth Module Conventions

<!-- WHY THIS FILE EXISTS: The users-auth module has security-critical patterns
     that a general-purpose assistant might implement differently. This instruction
     file is loaded automatically when any file matching api/src/users-auth/** is
     in context — the developer doesn't have to remember to ask for it. -->

## Auth Pattern
Refresh token is stored as an httpOnly cookie, not in localStorage.
This is a security decision. Do not move it to a response body.

## Magic Links
Tokens are signed with HMAC-SHA256 using `MAGIC_LINK_SECRET` env var.
Single-use: marked in Redis immediately upon redemption.
Token payload: `{ userId, pulseId, expiresAt }`. No other fields.

## Soft Deletes
`User` entity uses `@DeleteDateColumn()`. All queries must exclude soft-deleted records.
Use `UserRepository.findActiveById()` — never raw `find()`.
Raw `find()` returns deleted users. This is a recurring bug source.

## Anonymization Contract
User IDs must never appear in `pulse_responses`.
`PulseResponseRepository.save()` hashes the userId before write.
Never call raw TypeORM on pulse_responses.

## Password Handling
bcrypt cost 12 in `UsersService.create()`.
Never returned, never logged, never passed between services as plaintext.

## Error Codes
`AUTH_INVALID_CREDENTIALS`, `AUTH_TOKEN_EXPIRED`, `AUTH_MAGIC_LINK_USED`,
`AUTH_MAGIC_LINK_EXPIRED`. Use these. Do not invent new ones.
