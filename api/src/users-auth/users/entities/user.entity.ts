import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// WHY UUID primary key: Sequential integer IDs leak information (user count, sign-up rate).
// UUIDs are safe to expose in URLs and API responses (DB-02).
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  displayName: string;

  // WHY password is hashed at this level: The entity stores the hash, never the plaintext.
  // UsersService.create() hashes before calling save(). The column name 'passwordHash'
  // makes it obvious this is not the plaintext password.
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 'member' })
  role: string; // 'member' | 'lead' | 'admin'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // WHY @DeleteDateColumn: This enables TypeORM's soft-delete feature (DB-05).
  // Queries with withDeleted: false (default) automatically exclude soft-deleted rows.
  // BUT: raw find() can still return deleted rows if not using the repository methods.
  // Always use UserRepository.findActiveById() — it adds the explicit WHERE clause.
  @DeleteDateColumn()
  deletedAt: Date;
}
