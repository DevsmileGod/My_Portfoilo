import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates all required environment variables at startup
 * Throws descriptive error if any are missing or malformed
 */
const envSchema = z.object({
  // API Keys
  GEMINI_API_KEY: z
    .string()
    .min(1, 'GEMINI_API_KEY is required for AI chat functionality')
    .describe('Google Generative AI API key for chat endpoint'),

  // Telegram Configuration
  TELEGRAM_BOT_TOKEN: z
    .string()
    .min(1, 'TELEGRAM_BOT_TOKEN is required for contact form submissions')
    .regex(
      /^\d+:[A-Za-z0-9_-]+$/,
      'TELEGRAM_BOT_TOKEN format is invalid (expected: <bot_id>:<bot_token>)',
    )
    .describe('Telegram bot token for sending contact form messages'),

  TELEGRAM_CHAT_ID: z
    .string()
    .min(1, 'TELEGRAM_CHAT_ID is required for contact form submissions')
    .regex(
      /^-?\d+$/,
      'TELEGRAM_CHAT_ID must be a valid numeric chat ID',
    )
    .describe('Telegram chat ID where contact form messages are sent'),

  // Public URLs
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url('NEXT_PUBLIC_BASE_URL must be a valid URL')
    .describe('Base URL for the application (used in metadata and OG images)')
    .optional()
    .default('http://localhost:3000'),
});

/**
 * Validate environment variables at startup
 * This function is called once when the module is loaded
 * If validation fails, the error is logged with details about missing/invalid variables
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => {
          const path = err.path.join('.');
          return `  • ${path}: ${err.message}`;
        })
        .join('\n');

      const message = `
❌ Environment Variable Validation Failed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following environment variables are missing or invalid:

${missingVars}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please add these variables to your .env.local file:

GEMINI_API_KEY=your_gemini_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();

      console.error(message);
      throw new Error('Environment variable validation failed');
    }

    throw error;
  }
}

/**
 * Validated environment variables
 * Available throughout the application with full type safety
 * Validated at startup - if any are missing, the app will fail loudly
 */
export const env = validateEnv();

/**
 * Type-safe environment variables
 * Useful for type annotations in components/functions
 */
export type Env = typeof env;
