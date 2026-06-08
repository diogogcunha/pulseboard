import type { Metadata } from 'next';
import { LoginForm } from '@/components/users-auth/login-form';

export const metadata: Metadata = {
  title: 'Log in',
  // WHY NOINDEX: Authenticated pages should not be indexed (SR-10)
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Log in to PulseBoard</h1>
      {/* TODO (Issue #4): LoginForm component implements the actual form */}
      <LoginForm />
    </div>
  );
}
