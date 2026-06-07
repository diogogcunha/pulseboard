import type { Metadata } from 'next';
import './globals.css';

// WHY lang="en" ON HTML: WCAG 2.1 SC 3.1.1 requires the page language to be
// programmatically determinable. Screen readers use this to select pronunciation.
// (AR-08 requirement)
export const metadata: Metadata = {
  title: {
    template: '%s | PulseBoard',
    default: 'PulseBoard — Real-time Team Health',
  },
  description: 'Lightweight, real-time team health checks for engineering teams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* WHY SKIP TO MAIN: WCAG 2.1 SC 2.4.1 — keyboard users must be able to
            skip repeated navigation. This is the first focusable element on every page.
            (AR-09 requirement) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
