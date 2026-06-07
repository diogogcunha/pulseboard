import * as Joi from 'joi';

// WHY THIS FILE EXISTS: All environment variables are declared and validated here.
// If a required var is missing at startup, the app crashes with a clear Joi error
// instead of silently failing at runtime with an undefined reference.
// Add new env vars here BEFORE using them with ConfigService.
export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3001),

  // Database
  // DB_DRIVER selects the backend. Default is SQLite: zero-install, cross-platform
  // (macOS/Windows/Linux), no Docker required. Set to 'postgres' for the full
  // production-fidelity path (then the DB_HOST/USER/PASS/NAME vars become required).
  DB_DRIVER: Joi.string().valid('sqlite', 'postgres').default('sqlite'),
  // SQLite (used when DB_DRIVER=sqlite) — path to the database file.
  DB_DATABASE: Joi.string().default('./pulseboard.dev.sqlite'),
  // Postgres (required only when DB_DRIVER=postgres)
  DB_HOST: Joi.string().when('DB_DRIVER', { is: 'postgres', then: Joi.required(), otherwise: Joi.optional() }),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().when('DB_DRIVER', { is: 'postgres', then: Joi.required(), otherwise: Joi.optional() }),
  DB_PASS: Joi.string().when('DB_DRIVER', { is: 'postgres', then: Joi.required(), otherwise: Joi.optional() }),
  DB_NAME: Joi.string().when('DB_DRIVER', { is: 'postgres', then: Joi.required(), otherwise: Joi.optional() }),
  DB_POOL_SIZE: Joi.number().default(10),

  // Redis — optional. When empty, an in-process in-memory key-value store is used
  // (no Redis needed for local dev). Set a URL to use real Redis instead.
  REDIS_URL: Joi.string().allow('').optional(),

  // JWT
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Magic Links
  MAGIC_LINK_SECRET: Joi.string().min(32).required(),
  MAGIC_LINK_BASE_URL: Joi.string().uri().required(),

  // Email
  EMAIL_PROVIDER: Joi.string().valid('smtp', 'mock').default('mock'),
  SMTP_HOST: Joi.string().optional(),
  SMTP_PORT: Joi.number().optional(),
  SMTP_USER: Joi.string().optional(),
  SMTP_PASS: Joi.string().optional(),
  EMAIL_FROM: Joi.string().email().required(),

  // CORS
  FRONTEND_URL: Joi.string().uri().required(),

  // Logging
  LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error').default('info'),

  // OpenTelemetry (optional)
  OTEL_EXPORTER_OTLP_ENDPOINT: Joi.string().uri().optional(),
});
