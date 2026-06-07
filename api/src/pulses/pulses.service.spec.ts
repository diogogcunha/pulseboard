import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PulsesService } from './pulses.service';
import { Pulse } from './entities/pulse.entity';

// Pattern: mock the TypeORM repository with jest.fn() stubs
// The repository mock follows the same shape as the real TypeORM repository
describe('PulsesService', () => {
  let service: PulsesService;

  const mockPulseRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PulsesService,
        { provide: getRepositoryToken(Pulse), useValue: mockPulseRepo },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<PulsesService>(PulsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO (Issue #5): Add tests for create and findByCreator
  // TODO (Issue #6): Add test that send() emits 'pulse.submitted' event
  //   and that invalid status transitions throw BadRequestException
});
