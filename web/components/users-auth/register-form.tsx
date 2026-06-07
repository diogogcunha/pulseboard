'use client';

import { useState } from 'react';

// TODO (Issue #4): Implement full registration form
export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('Not yet implemented — see Issue #4');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
          Your name
        </label>
        <input
          id="displayName"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          id="reg-email"
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-gray-400 font-normal">(min. 8 characters)</span>
        </label>
        <input
          id="reg-password"
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600"
          required
          minLength={8}
        />
      </div>

      {error && (
        <p role="alert" className="text-error text-sm mb-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 text-white py-3 rounded hover:bg-primary-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  );
}
