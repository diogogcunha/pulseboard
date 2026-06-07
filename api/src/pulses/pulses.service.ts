import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Pulse } from './entities/pulse.entity';

@Injectable()
export class PulsesService {
  constructor(
    @InjectRepository(Pulse)
    private readonly pulseRepo: Repository<Pulse>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // TODO (Issue #5): Implement
  async create(data: { title: string; question: string; responseType: string; teamId: string; createdById: string }): Promise<Pulse> {
    throw new Error('Not implemented — see Issue #5');
  }

  // TODO (Issue #5): Implement
  async findByCreator(userId: string): Promise<Pulse[]> {
    throw new Error('Not implemented — see Issue #5');
  }

  // TODO (Issue #6): Implement — transitions draft → active, emits pulse.submitted event
  // WHY EMIT NOT DIRECT CALL: The notifications module listens to this event.
  // Direct import would create a circular dependency and break module boundaries.
  async send(pulseId: string, userId: string): Promise<void> {
    throw new Error('Not implemented — see Issue #6');
    // Pattern:
    // const pulse = await this.pulseRepo.findOneOrFail(...)
    // if (pulse.status !== 'draft') throw new BadRequestException({ errorCode: 'PULSE_INVALID_STATUS_TRANSITION' })
    // await this.pulseRepo.update(pulseId, { status: 'active' })
    // this.eventEmitter.emit('pulse.submitted', { pulseId, teamId: pulse.teamId, submittedAt: new Date() })
  }
}
