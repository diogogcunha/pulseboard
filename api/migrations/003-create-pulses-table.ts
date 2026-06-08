import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePulsesTable003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pulses',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'title', type: 'varchar' },
          { name: 'question', type: 'text' },
          { name: 'response_type', type: 'varchar', default: "'scale'" },
          { name: 'status', type: 'varchar', default: "'draft'" },
          { name: 'created_by', type: 'uuid' },
          { name: 'team_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
          { name: 'deleted_at', type: 'timestamptz', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'pulse_assignments',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'pulse_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'responded', type: 'boolean', default: 'false' },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'pulse_templates',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'name', type: 'varchar' },
          { name: 'question', type: 'text' },
          { name: 'response_type', type: 'varchar' },
          { name: 'is_system', type: 'boolean', default: 'false' },
          { name: 'created_by', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('pulses', new TableForeignKey({
      columnNames: ['created_by'], referencedTableName: 'users', referencedColumnNames: ['id'],
    }));
    await queryRunner.createForeignKey('pulse_assignments', new TableForeignKey({
      columnNames: ['pulse_id'], referencedTableName: 'pulses', referencedColumnNames: ['id'],
    }));
    await queryRunner.query('CREATE INDEX idx_pulse_assignments_pulse_id ON pulse_assignments(pulse_id)');
    await queryRunner.query('CREATE INDEX idx_pulse_assignments_user_id ON pulse_assignments(user_id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pulse_assignments');
    await queryRunner.dropTable('pulse_templates');
    await queryRunner.dropTable('pulses');
  }
}
