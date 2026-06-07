import type { Metadata } from 'next';
import Script from 'next/script';

// WHY generateMetadata IS NOT USED HERE: This is a static page — Next.js allows
// the metadata export directly on static pages. generateMetadata is for dynamic
// routes that need to fetch data (e.g. /pulses/[id]) to build the title.
// (SR-11 requirement: use generateMetadata only for dynamic routes)
export const metadata: Metadata = {
  title: 'PulseBoard — Real-time Team Health for Engineering Teams',
  description: 'Lightweight sprint health checks that take under 5 minutes to run. Built for engineering managers who care about their teams.',
  openGraph: {
    title: 'PulseBoard — Real-time Team Health',
    description: 'Sprint health checks in under 5 minutes.',
    type: 'website',
  },
};

// WHY JSON-LD IS PRE-BUILT: SEO and AEO structured data is part of the landing page
// skeleton (it doesn't change sprint by sprint). Participants implement the page
// content and interactivity, not the metadata scaffolding.
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PulseBoard',
  applicationCategory: 'BusinessApplication',
  description: 'Real-time team health platform for engineering teams. Send pulse checks, get anonymized results, track trends across sprints.',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free to start',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PulseBoard?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PulseBoard is a lightweight team health platform that lets engineering managers send quick pulse checks to their teams and see anonymized results in minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do team members need to create an account to respond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Team members receive a magic link via email and can respond in under 2 minutes without creating an account or logging in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are responses anonymous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Individual responses are never attributable to a specific team member. Results are always shown as aggregates.',
      },
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      {/* Structured data for SEO and AEO */}
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        {/* WHY ONE H1: SR-02 and SEO best practice — one H1 per page with the primary keyword */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          What's the temperature of your team — right now.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Sprint health checks in under 5 minutes. Anonymized results. Trend data across cycles.
          Built for engineering leads who don't have time for 30-minute surveys.
        </p>
        <a
          href="/register"
          className="inline-block bg-primary-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
        >
          Get started free
        </a>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="features-heading" className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need, nothing you don't
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Send in 3 clicks</h3>
              <p className="text-gray-600">Pick a template, select your team, send. No configuration required.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Anonymous by design</h3>
              <p className="text-gray-600">Individual responses are never identifiable. Always aggregated.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trends that matter</h3>
              <p className="text-gray-600">See if your team is getting healthier after that restructure. 4 cycles minimum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — required for FAQPage JSON-LD (SR-06) */}
      <section className="max-w-4xl mx-auto px-4 py-16" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
        <dl className="space-y-6">
          <div>
            <dt className="text-lg font-semibold text-gray-900">What is PulseBoard?</dt>
            <dd className="mt-2 text-gray-600">PulseBoard is a lightweight team health platform that lets engineering managers send quick pulse checks and see anonymized results in minutes.</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold text-gray-900">Do team members need to create an account?</dt>
            <dd className="mt-2 text-gray-600">No. Team members receive a magic link via email and can respond without creating an account.</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold text-gray-900">Are responses anonymous?</dt>
            <dd className="mt-2 text-gray-600">Yes. Individual responses are never attributable to a specific person. Results are always shown as aggregates.</dd>
          </div>
        </dl>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to take the temperature?</h2>
        <p className="text-primary-100 mb-8">Free to start. No credit card required.</p>
        <a
          href="/register"
          className="inline-block bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50"
        >
          Start free
        </a>
      </section>
    </>
  );
}
