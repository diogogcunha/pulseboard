import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email/email.service';
import { PreferencesService } from './preferences/preferences.service';
import { LoggerService } from '../common/logger/logger.service';

// WHY @OnEvent AND NOT A DIRECT CALL: The notifications module must not import
// from the pulses module. Using EventEmitter2's @OnEvent decorator keeps the
// modules decoupled — pulses emits an event, notifications handles it,
// and neither knows the other's internals. (Module boundary rule)
@Injectable()
export class NotificationsService {
  constructor(
    private readonly emailService: EmailService,
    private readonly preferencesService: PreferencesService,
    private readonly logger: LoggerService,
  ) {}

  // TODO (Issue #10): Implement — send email when pulse is sent to team
  // Event payload: { pulseId, teamId, submittedAt, magicLinks: { userId, token }[] }
  @OnEvent('pulse.submitted')
  async handlePulseSubmitted(payload: any) {
    this.logger.log('Handling pulse.submitted event — not yet implemented', 'NotificationsService');
    // Pattern:
    // for each team member:
    //   1. Check preferences — if opted out, skip (log at DEBUG)
    //   2. Send email with magic link — fire and forget (no await)
    //   3. On email error: log at ERROR, do not throw
  }
}
