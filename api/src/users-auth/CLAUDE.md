# users-auth Module

## Auth Pattern
Refresh token → httpOnly cookie only. Not localStorage. Not response body.
Security constraint — do not move it.

## Magic Links
Signed with HMAC-SHA256 using `MAGIC_LINK_SECRET`.
Single-use: mark used in Redis on first redemption (`magic-links.service.ts`).
Token shape: `{ userId, pulseId, expiresAt }` — no other fields.

## Soft Deletes
`User` entity uses `@DeleteDateColumn()`.
Always use `UserRepository.findActiveById()` — never raw `find()`.
Raw `find()` returns deleted users. This is a recurring bug source.

## Anonymization Contract
User IDs never go into `pulse_responses`.
`PulseResponseRepository.save()` hashes the userId.
Never write to `pulse_responses` directly.

## Password Handling
bcrypt cost 12 in `UsersService.create()`.
Never returned, never logged, never passed between services as plaintext.

## Error Codes
`AUTH_INVALID_CREDENTIALS`, `AUTH_TOKEN_EXPIRED`, `AUTH_MAGIC_LINK_USED`,
`AUTH_MAGIC_LINK_EXPIRED`. Use these exactly.
