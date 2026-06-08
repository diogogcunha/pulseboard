import type { Metadata } from 'next';
import { PulseForm } from '@/components/pulses/pulse-form';

export const metadata: Metadata = {
  title: 'New pulse',
  robots: { index: false },
};

export default function NewPulsePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Send a pulse</h1>
      {/* TODO (Issue #4, #5): PulseForm implements the creation form */}
      <PulseForm />
    </div>
  );
}
