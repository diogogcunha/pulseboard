import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users-auth/users/entities/user.entity';

export type PulseStatus = 'draft' | 'active' | 'closed';
export type ResponseType = 'scale' | 'emoji' | 'text';

// WHY status is typed: The status machine (draft→active→closed) is enforced
// in PulsesService. The type here makes the valid states explicit and
// prevents silent string typos.
@Entity('pulses')
export class Pulse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  question: string;

  @Column({ type: 'varchar', default: 'scale' })
  responseType: ResponseType;

  @Column({ type: 'varchar', default: 'draft' })
  status: PulseStatus;

  // The user who created (owns) this pulse
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  // The team this pulse is sent to (nullable until sent)
  @Column({ name: 'team_id', nullable: true })
  teamId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
