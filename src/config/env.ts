/**
 * Environment configuration and validation
 * This file ensures all required environment variables are present and properly typed
 */

interface EnvironmentConfig {
  // Stripe Configuration
  STRIPE_SECRET_KEY: string;
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;

  // Application Configuration
  NEXT_PUBLIC_APP_URL: string;
  NODE_ENV: "development" | "production" | "test";
}

/**
 * Validates that all required environment variables are present
 * Throws an error if any required variables are missing
 */
function validateEnvironment(): EnvironmentConfig {
  const requiredEnvVars = [
    "STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLIC_KEY",
    "NEXT_PUBLIC_APP_URL",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env file and ensure all required variables are set.\n" +
        "See .env.example for reference."
    );
  }

  return {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
    NODE_ENV:
      (process.env.NODE_ENV as EnvironmentConfig["NODE_ENV"]) || "development",
  };
}

/**
 * Validated environment configuration
 * Use this instead of process.env directly to ensure type safety
 */
export const env = validateEnvironment();

/**
 * Helper functions for environment-specific logic
 */
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

/**
 * Get the appropriate URL for the current environment
 */
export function getAppUrl(path: string = ""): string {
  const baseUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, ""); // Remove trailing slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
