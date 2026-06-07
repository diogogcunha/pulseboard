import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pulse_templates')
export class PulseTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  question: string;

  @Column({ type: 'varchar' })
  responseType: string;

  // WHY isSystem: System templates are pre-seeded and cannot be deleted by users.
  // User-created templates can be deleted. This flag drives UI differentiation too.
  @Column({ name: 'is_system', default: false })
  isSystem: boolean;

  // null for system templates (no owner); userId for user-created templates
  @Column({ name: 'created_by', nullable: true })
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
