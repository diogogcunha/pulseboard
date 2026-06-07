import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Pulse } from './pulse.entity';

// WHY A SEPARATE ASSIGNMENT TABLE: A pulse can be sent to a team (team assignment)
// or to individual users. The assignment table tracks who received the pulse and
// whether they've responded (for participation rate calculation).
@Entity('pulse_assignments')
export class PulseAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pulse)
  @JoinColumn({ name: 'pulse_id' })
  pulse: Pulse;

  @Column({ name: 'pulse_id' })
  pulseId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ default: false })
  responded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
