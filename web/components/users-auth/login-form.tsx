'use client';

// WHY 'use client': This component uses React state (form controlled inputs).
// Server components cannot use useState or event handlers.
import { useState } from 'react';

// TODO (Issue #4): Implement full login form with:
// - Email and password controlled inputs
// - All inputs must have associated <label> elements (AR-03)
// - Error messages as <p role="alert"> linked via aria-describedby (AR-04)
// - Loading state on submit button (disabled while submitting)
// - Redirect to /dashboard on success

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO (Issue #4): Call POST /api/v1/auth/login
    setError('Not yet implemented — see Issue #4');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        {/* WHY <label> NOT PLACEHOLDER: AR-03 — inputs must have programmatically
            associated labels, not just placeholder text */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-describedby={error ? 'login-error' : undefined}
          className="w-full border border-gray-300 rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus-visible:ring-2 focus-visible:ring-primary-600"
          required
        />
      </div>

      {/* WHY role="alert": AR-04 — error messages must be announced to screen readers */}
      {error && (
        <p id="login-error" role="alert" className="text-error text-sm mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 text-white py-3 rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging in…' : 'Log in'}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account? <a href="/register" className="text-primary-600 hover:underline">Sign up</a>
      </p>
    </form>
  );
}
