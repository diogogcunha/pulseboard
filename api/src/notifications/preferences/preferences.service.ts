import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationPreference } from './entities/notification-preference.entity';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(NotificationPreference)
    private readonly repo: Repository<NotificationPreference>,
  ) {}

  // TODO (Issue #11): Implement — return preferences, create defaults if none exist
  async getPreferences(userId: string): Promise<NotificationPreference> {
    throw new Error('Not implemented — see Issue #11');
  }

  // TODO (Issue #11): Implement
  async updatePreferences(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference> {
    throw new Error('Not implemented — see Issue #11');
  }
}
