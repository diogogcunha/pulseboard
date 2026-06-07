import type { Metadata } from 'next';
import { ResultsView } from '@/components/insights/results-view';

// WHY generateMetadata FOR DYNAMIC ROUTES: The page title includes the pulse name,
// which requires fetching data. Static metadata export can't do that. (SR-11)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // TODO (Issue #9): Fetch pulse name and use it in the title
  return {
    title: `Pulse results`,
    robots: { index: false },
  };
}

export default function PulseResultsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pulse results</h1>
      {/* TODO (Issue #9): ResultsView renders charts with aggregated data */}
      <ResultsView pulseId={params.id} />
    </div>
  );
}
