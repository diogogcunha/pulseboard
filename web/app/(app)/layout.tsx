// Authenticated app layout — requires login
// TODO: Add auth guard (redirect to /login if no valid session)
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200" aria-label="Application navigation">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/dashboard" className="text-lg font-bold text-primary-700">PulseBoard</a>
          <div className="flex items-center gap-4">
            <a href="/pulses/new" className="text-sm text-gray-600 hover:text-primary-600">New pulse</a>
            <a href="/templates" className="text-sm text-gray-600 hover:text-primary-600">Templates</a>
            <a href="/settings" className="text-sm text-gray-600 hover:text-primary-600">Settings</a>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
