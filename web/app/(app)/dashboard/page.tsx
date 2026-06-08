import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {/* TODO (Issue #3): Implement dashboard with active pulses, recent results, quick-send CTA */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Active pulses</h2>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Responses today</h2>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Avg participation</h2>
          <p className="text-3xl font-bold text-gray-900">—</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-6 text-center">
        <p className="text-gray-500 mb-4">No active pulses. Send your first one.</p>
        <a
          href="/pulses/new"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
        >
          Send a pulse
        </a>
      </div>
    </div>
  );
}
