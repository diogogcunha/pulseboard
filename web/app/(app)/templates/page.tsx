import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pulse templates',
  robots: { index: false },
};

export default function TemplatesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pulse templates</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
          Create template
        </button>
      </div>
      {/* TODO (Issue #12): Render template cards grid */}
      <div className="text-center py-12 text-gray-500">
        Loading templates...
      </div>
    </div>
  );
}
