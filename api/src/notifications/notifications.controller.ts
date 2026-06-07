import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users-auth/auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { PreferencesService } from './preferences/preferences.service';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly preferencesService: PreferencesService) {}

  // TODO (Issue #11): Implement
  @Get('preferences')
  async getPreferences(@CurrentUser() user: CurrentUserPayload) {
    throw new Error('Not implemented — see Issue #11');
  }

  // TODO (Issue #11): Implement
  @Patch('preferences')
  async updatePreferences(@CurrentUser() user: CurrentUserPayload, @Body() body: any) {
    throw new Error('Not implemented — see Issue #11');
  }
}
