import type { Metadata } from 'next';
import { ResponseForm } from '@/components/pulses/response-form';

export const metadata: Metadata = {
  title: 'Respond to pulse',
  // WHY NOINDEX: Magic link pages are single-use and must not be indexed (SR-10)
  robots: { index: false, follow: false },
};

// WHY THIS PAGE IS IN THE ROOT (not under (app)): This page is public — no login
// required. It's accessed via magic link. Using the root route group keeps it
// out of the authenticated app layout.
export default function RespondPage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow p-8">
        {/* TODO (Issue #7): ResponseForm validates token, loads pulse, handles submission */}
        <ResponseForm token={params.token} />
      </div>
    </div>
  );
}
