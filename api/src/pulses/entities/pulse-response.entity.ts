import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Pulse } from './pulse.entity';

// WHY userId IS HASHED: DB-03 requires user IDs to be hashed in pulse_responses
// to preserve anonymity. The hash is one-way — you cannot recover the original
// userId from the stored value. This is enforced in PulseResponseRepository.save().
// The column is named 'user_id_hash' to make the intent obvious.
@Entity('pulse_responses')
export class PulseResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pulse)
  @JoinColumn({ name: 'pulse_id' })
  pulse: Pulse;

  @Column({ name: 'pulse_id' })
  pulseId: string;

  // Anonymized — this is a one-way hash of the actual userId.
  // Never store the raw userId here.
  @Column({ name: 'user_id_hash' })
  userIdHash: string;

  @Column('text', { nullable: true })
  textResponse: string;

  @Column({ nullable: true })
  scaleResponse: number;

  @Column({ nullable: true })
  emojiResponse: string;

  @CreateDateColumn()
  createdAt: Date;
}
