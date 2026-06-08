'use client';

// WHY THIS IS THE HIGHEST-PRIORITY ACCESSIBILITY SURFACE (from skill):
// This page is used by team members via magic link — no login, possibly on mobile,
// potentially with assistive technology. All three response types must be
// screen-reader navigable.

// TODO (Issue #7): Implement full response form
// - Validate token via GET /api/v1/pulses/respond/:token (get question + type)
// - Render correct input type: scale (1-10 radio), emoji (button group), text (textarea)
// - Success state after submit: role="status" announcement
// - Error state if token expired: role="alert"
// - Fully keyboard navigable
export function ResponseForm({ token }: { token: string }) {
  return (
    <div className="text-center">
      <p className="text-gray-500">
        Loading pulse… (implement in Issue #7)
      </p>
      <p className="text-xs text-gray-400 mt-2">Token: {token.slice(0, 8)}…</p>
    </div>
  );
}
