import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { aggregatePulseResults, getPulseTrend } from './queries/aggregation.queries';

@Injectable()
export class InsightsService {
  constructor(private readonly dataSource: DataSource) {}

  // TODO (Issue #8): Implement using aggregatePulseResults query
  // NEVER return individual responses — only the aggregate object
  async getPulseResults(pulseId: string) {
    throw new Error('Not implemented — see Issue #8');
  }

  // TODO (Issue #8): Implement using getPulseTrend query
  async getTrends(pulseTemplateId: string) {
    throw new Error('Not implemented — see Issue #8');
  }
}
