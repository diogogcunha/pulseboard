import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PulseResponse } from '../pulses/entities/pulse-response.entity';
import { Pulse } from '../pulses/entities/pulse.entity';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';

@Module({
  imports: [TypeOrmModule.forFeature([PulseResponse, Pulse])],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
