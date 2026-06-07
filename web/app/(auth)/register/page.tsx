import type { Metadata } from 'next';
import { RegisterForm } from '@/components/users-auth/register-form';

export const metadata: Metadata = {
  title: 'Create account',
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h1>
      {/* TODO (Issue #4): RegisterForm component */}
      <RegisterForm />
    </div>
  );
}
