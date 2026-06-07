import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificationPreferencesTable005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_preferences',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'user_id', type: 'uuid', isUnique: true },
          { name: 'pulse_email_enabled', type: 'boolean', default: 'true' },
          { name: 'reminder_email_enabled', type: 'boolean', default: 'true' },
          { name: 'in_app_enabled', type: 'boolean', default: 'true' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_preferences');
  }
}
