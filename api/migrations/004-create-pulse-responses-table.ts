import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePulseResponsesTable004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // WHY user_id_hash AND NOT user_id: DB-03 requires anonymization.
    // The hash is one-way — you cannot recover the original userId.
    await queryRunner.createTable(
      new Table({
        name: 'pulse_responses',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'pulse_id', type: 'uuid' },
          { name: 'user_id_hash', type: 'varchar', comment: 'One-way hash of userId — never store raw userId here' },
          { name: 'text_response', type: 'text', isNullable: true },
          { name: 'scale_response', type: 'int', isNullable: true },
          { name: 'emoji_response', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('pulse_responses', new TableForeignKey({
      columnNames: ['pulse_id'], referencedTableName: 'pulses', referencedColumnNames: ['id'],
    }));
    await queryRunner.query('CREATE INDEX idx_pulse_responses_pulse_id ON pulse_responses(pulse_id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pulse_responses');
  }
}
