import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../common/logger/logger.service';

// WHY THE PROVIDER PATTERN: Email sending uses a provider abstraction so that
// in development/test we use a mock (logs to console), in production we swap to
// a real SMTP/transactional provider without changing service code.
@Injectable()
export class EmailService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  // TODO (Issue #10): Implement — send email using the configured provider
  // HTML template: notifications/email/templates/pulse-invitation.hbs
  // Plain text fallback required (BR-06)
  async sendPulseInvitation(to: string, data: {
    pulseQuestion: string;
    teamLeadName: string;
    magicLink: string;
    expiresIn: string;
    unsubscribeLink: string;
  }): Promise<void> {
    // Stub: log in dev, skip in test
    if (this.config.get('EMAIL_PROVIDER') === 'mock') {
      this.logger.debug(`[MOCK EMAIL] To: ${to}, Subject: You have a new pulse`, 'EmailService');
      return;
    }
    throw new Error('Not implemented — see Issue #10');
  }
}
