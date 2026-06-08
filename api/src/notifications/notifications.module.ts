import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationPreference } from './preferences/entities/notification-preference.entity';
import { NotificationsService } from './notifications.service';
import { EmailService } from './email/email.service';
import { PreferencesService } from './preferences/preferences.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationPreference])],
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailService, PreferencesService],
})
export class NotificationsModule {}
