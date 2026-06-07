---
applyTo: "api/src/users-auth/auth/**"
---

# users-auth/auth Sub-Scope Conventions

<!-- WHY THIS FILE EXISTS: This is a more specific applyTo scope than users-auth.instructions.md.
     It loads in addition to the module-level instructions when files in the auth/
     sub-directory are in context. Copilot's glob specificity means both load — more
     specific doesn't replace less specific, both are merged.
     
     This demonstrates the Copilot "sub-scope instructions" pattern — a narrower glob
     pointing at a sub-directory for constraints that only apply there. -->

## JWT Strategy
The JWT strategy extracts `sub` (userId) and `email` from the token payload.
The `@CurrentUser()` decorator exposes this as `{ id, email }` in controllers.
Never access `req.user` directly — always use `@CurrentUser()`.

## Passport Guards
`JwtAuthGuard` extends Passport's `AuthGuard('jwt')`.
`LocalAuthGuard` extends `AuthGuard('local')` — only used on `/auth/login`.
Mark public routes with `@Public()` decorator — the guard checks for this metadata.

## Refresh Token Rotation
On each refresh, the old token is invalidated (deleted from Redis) and a new one is issued.
This prevents refresh token reuse attacks.
Token storage key in Redis: `refresh:<userId>:<tokenId>`.

## Rate Limiting on Auth Endpoints
Auth endpoints (`/auth/login`, `/auth/register`, `/auth/refresh`) have a stricter
throttle: 10 requests/min. This is configured via `@Throttle()` decorator on the controller.
