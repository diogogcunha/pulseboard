'use client';

// TODO (Issue #9): Implement results view with charts
// - Bar chart for score distribution
// - Donut chart for participation rate
// - Line chart for trend view (requires >= 2 data points)
// - All charts must have aria-label text alternative (AR-05)
// - Empty state when no responses

// WHY RECHARTS: It's accessible (SVG-based, supports aria attributes) and works
// well with React. The chart components in components/ui/chart/ wrap recharts
// with the required accessibility attributes pre-applied.
export function ResultsView({ pulseId }: { pulseId: string }) {
  return (
    <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
      Results view — see Issue #9 to implement
    </div>
  );
}
