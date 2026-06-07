# notifications Module

## Event-Driven (Critical)
Listen to pulse.submitted and other events via EventEmitter2.
Never import PulseService, PulseRepository, or any internal pulses file.
The event payload is the contract.

## Email is Async
Never block API response waiting for email. Fire-and-forget or queue.

## Preference Check Before Every Dispatch
Load NotificationPreference. If opted out, skip. Log the skip at DEBUG level.

## Failed Email
Catch email errors. Log at ERROR level. Never throw. Continue execution.

## Templates
Email templates are .hbs files in notifications/email/templates/.
Never inline HTML strings in service code.
