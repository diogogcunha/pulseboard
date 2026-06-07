import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pulse } from './entities/pulse.entity';
import { PulseTemplate } from './entities/pulse-template.entity';
import { PulseResponse } from './entities/pulse-response.entity';
import { PulseAssignment } from './entities/pulse-assignment.entity';
import { PulsesController } from './pulses.controller';
import { PulsesService } from './pulses.service';
import { MagicLinksService } from './magic-links/magic-links.service';
import { PulseTemplatesService } from './pulse-templates/pulse-templates.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pulse, PulseTemplate, PulseResponse, PulseAssignment])],
  controllers: [PulsesController],
  providers: [PulsesService, MagicLinksService, PulseTemplatesService],
  exports: [PulsesService],
})
export class PulsesModule {}
