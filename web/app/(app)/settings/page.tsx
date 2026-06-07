import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account settings',
  robots: { index: false },
};

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account settings</h1>
      {/* TODO (Issue #4, #11): Profile, notification preferences, delete account */}
      <div className="space-y-6">
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
          <p className="text-gray-500 text-sm">— not yet implemented —</p>
        </section>
        <section className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification preferences</h2>
          <p className="text-gray-500 text-sm">— not yet implemented —</p>
        </section>
      </div>
    </div>
  );
}
