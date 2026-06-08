import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users-auth/auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { PulsesService } from './pulses.service';
import { CreatePulseDto } from './dto/create-pulse.dto';

@ApiTags('pulses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pulses')
export class PulsesController {
  constructor(private readonly pulsesService: PulsesService) {}

  // TODO (Issue #5): Implement
  @Post()
  async create(@Body() dto: CreatePulseDto, @CurrentUser() user: CurrentUserPayload) {
    throw new Error('Not implemented — see Issue #5');
  }

  // TODO (Issue #5): Implement
  @Get()
  async findMyPulses(@CurrentUser() user: CurrentUserPayload) {
    throw new Error('Not implemented — see Issue #5');
  }

  // TODO (Issue #5): Implement
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    throw new Error('Not implemented — see Issue #5');
  }

  // TODO (Issue #6): Implement — send pulse, generate magic links
  @Post(':id/send')
  async send(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    throw new Error('Not implemented — see Issue #6');
  }

  // TODO (Issue #6): Implement — respond to pulse via magic link token
  @Post('respond/:token')
  async respond(@Param('token') token: string, @Body() body: any) {
    throw new Error('Not implemented — see Issue #6');
  }
}
