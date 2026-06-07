// WHY THIS FILE EXISTS: OpenTelemetry SDK must initialize before any other module.
// This file is imported as the FIRST line of main.ts.
// If OTEL_EXPORTER_OTLP_ENDPOINT is not set, tracing is disabled silently.
// Participants implement this as Issue #15.

// TODO (Issue #15): Initialize OpenTelemetry SDK here.
// Import @opentelemetry/sdk-node and configure:
// - serviceName: 'pulseboard-api'
// - auto-instrumentation for HTTP and DB
// - OTLP exporter to OTEL_EXPORTER_OTLP_ENDPOINT
//
// Stub (no-op until Issue #15 is implemented):
if (process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
  // eslint-disable-next-line no-console
  console.log('[OTEL] Tracing stub loaded — implement Issue #15 to activate');
}
