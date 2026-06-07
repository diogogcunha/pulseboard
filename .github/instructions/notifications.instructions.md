---
applyTo: "api/src/notifications/**"
---

# notifications Module Conventions

<!-- WHY THIS FILE EXISTS: The notifications module's critical constraint is its
     event-driven architecture. It must never directly import from other modules.
     An agent without this instruction will reach for PulseService — this stops that. -->

## Event-Driven Architecture (Critical)
The notifications module does NOT import from `pulses/`, `insights/`, or `users-auth/`
internal files. It listens to events published via EventEmitter2.

Event listeners are in `NotificationsService` with `@OnEvent('pulse.submitted')`.
The event payload is the contract — not a service import.

## Email is Async
Email dispatch MUST NOT block the API response.
Use fire-and-forget pattern: call `emailService.send()` without `await` in request handlers,
OR dispatch via a queue/event (preferred for production; the queue pattern is pre-wired in the skeleton).

## Preference Check Before Dispatch
Before sending any email or notification:
1. Load the user's `NotificationPreference`
2. If opted out of the relevant notification type, skip dispatch
3. Log the skip at DEBUG level with userId and preference checked

## Failed Email Handling
A failed email MUST NOT cause the originating request to fail.
Catch email errors, log at ERROR level with: userId (hashed), pulseId, errorMessage, traceId.
Then continue normal execution.

## Template Location
Email templates are Handlebars (`.hbs`) files in `src/notifications/email/templates/`.
Never inline HTML email strings in service code.
