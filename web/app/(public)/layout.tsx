// Public layout — no authentication required
// Used for: landing page, public-facing content
// WHY A SEPARATE LAYOUT: Next.js route groups allow different layouts for
// authenticated vs unauthenticated pages without affecting the URL structure.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-primary-700">PulseBoard</a>
          <nav aria-label="Main navigation">
            <a href="/login" className="text-sm text-gray-600 hover:text-primary-600 mr-4">Log in</a>
            <a href="/register" className="text-sm bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">Get started</a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
