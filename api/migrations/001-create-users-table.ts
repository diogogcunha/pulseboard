import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, default: 'gen_random_uuid()' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'display_name', type: 'varchar' },
          { name: 'password_hash', type: 'varchar' },
          { name: 'avatar_url', type: 'varchar', isNullable: true },
          { name: 'role', type: 'varchar', default: "'member'" },
          { name: 'created_at', type: 'timestamptz', default: 'now()' },
          { name: 'updated_at', type: 'timestamptz', default: 'now()' },
          { name: 'deleted_at', type: 'timestamptz', isNullable: true },
        ],
      }),
      true,
    );
    await queryRunner.query(`CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
