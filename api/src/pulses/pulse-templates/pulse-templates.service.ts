import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// WHY THIS SERVICE EXISTS: Pulse templates allow team leads to reuse questions
// across pulse cycles. System templates are pre-seeded; user templates are
// created per-user. Participants implement this in Issue #7.
@Injectable()
export class PulseTemplatesService {
  constructor(private readonly config: ConfigService) {}

  // TODO (Issue #7): Implement — list system templates + user's own templates
  async findAll(userId: string) {
    throw new Error('Not implemented — see Issue #7');
  }

  // TODO (Issue #7): Implement — create user-owned template
  async create(userId: string, data: { name: string; question: string; responseType: string }) {
    throw new Error('Not implemented — see Issue #7');
  }
}
