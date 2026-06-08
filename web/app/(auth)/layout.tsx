// Auth layout — used for login and register pages
// WHY SEPARATE FROM PUBLIC: Auth pages have a simpler layout (no nav, centered form)
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-primary-700">PulseBoard</a>
        </div>
        {children}
      </div>
    </div>
  );
}
