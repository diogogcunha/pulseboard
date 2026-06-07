import { DataSource } from 'typeorm';

// WHY RAW SQL HERE: Aggregation queries are complex and performance-sensitive.
// TypeORM's QueryBuilder can handle them, but raw SQL is easier to EXPLAIN ANALYZE
// and optimize. All queries in this file must be reviewed against EXPLAIN ANALYZE
// output before merging. (DB-10 requirement)

// TODO (Issue #8): Implement — returns mean, median, distribution, participation %
// NEVER include user identifiers (raw or hashed) in the return value
export async function aggregatePulseResults(
  dataSource: DataSource,
  pulseId: string,
): Promise<{
  mean: number;
  median: number;
  distribution: Record<string, number>;
  participationPercent: number;
  responseCount: number;
}> {
  throw new Error('Not implemented — see Issue #8');
  // Pattern (scale responses):
  // SELECT
  //   AVG(scale_response) as mean,
  //   PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY scale_response) as median,
  //   COUNT(*) as response_count,
  //   (COUNT(*)::float / (SELECT COUNT(*) FROM pulse_assignments WHERE pulse_id = $1)) as participation_pct
  // FROM pulse_responses
  // WHERE pulse_id = $1
}

// TODO (Issue #8): Implement — returns trend across multiple pulse cycles for same template
export async function getPulseTrend(
  dataSource: DataSource,
  pulseTemplateId: string,
): Promise<Array<{ pulseId: string; date: Date; mean: number; participationPercent: number }>> {
  throw new Error('Not implemented — see Issue #8');
}
