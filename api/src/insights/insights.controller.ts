import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users-auth/auth/guards/jwt-auth.guard';
import { InsightsService } from './insights.service';

@ApiTags('insights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  // TODO (Issue #8): Implement — returns aggregate only (never individual responses)
  @Get('pulses/:id/results')
  async getPulseResults(@Param('id') id: string) {
    throw new Error('Not implemented — see Issue #8');
  }

  // TODO (Issue #8): Implement — returns trend data across pulse cycles
  @Get('trends')
  async getTrends(@Query('pulseTemplateId') pulseTemplateId: string) {
    throw new Error('Not implemented — see Issue #8');
  }
}
