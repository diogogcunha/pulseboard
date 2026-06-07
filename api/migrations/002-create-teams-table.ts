import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTeamsTable002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'name', type: 'varchar' },
          { name: 'org_id', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'team_members',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'team_id', type: 'uuid' },
          { name: 'user_id', type: 'uuid' },
          { name: 'role', type: 'varchar', default: "'member'" },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey('team_members', new TableForeignKey({
      columnNames: ['team_id'], referencedTableName: 'teams', referencedColumnNames: ['id'],
    }));
    await queryRunner.createForeignKey('team_members', new TableForeignKey({
      columnNames: ['user_id'], referencedTableName: 'users', referencedColumnNames: ['id'],
    }));
    await queryRunner.query('CREATE INDEX idx_team_members_team_id ON team_members(team_id)');
    await queryRunner.query('CREATE INDEX idx_team_members_user_id ON team_members(user_id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('team_members');
    await queryRunner.dropTable('teams');
  }
}
