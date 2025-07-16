/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Centralized logging system for the application
 * Provides different log levels and environment-aware logging
 */

import { isProduction } from "@/config/env";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private shouldLog(level: LogLevel): boolean {
    // In production, only log errors and warnings
    if (isProduction) {
      return level === LogLevel.ERROR || level === LogLevel.WARN;
    }

    // In development, log everything
    return true;
  }

  private formatLogEntry(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;

    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    if (context && Object.keys(context).length > 0) {
      logMessage += `\nContext: ${JSON.stringify(context, null, 2)}`;
    }

    if (error) {
      logMessage += `\nError: ${error.message}`;
      if (error.stack) {
        logMessage += `\nStack: ${error.stack}`;
      }
    }

    return logMessage;
  }

  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    };

    const formattedMessage = this.formatLogEntry(entry);

    // Use appropriate console method based on log level
    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
    }

    // In production, you might want to send errors to an external service
    if (isProduction && level === LogLevel.ERROR) {
      this.sendToExternalService(entry);
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // TODO: Implement external logging service integration
    // Examples: Sentry, LogRocket, DataDog, etc.
    // For now, this is a placeholder
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience functions for common use cases
export const logError = (
  message: string,
  error?: Error,
  context?: LogContext
) => {
  logger.error(message, error, context);
};

export const logWarning = (message: string, context?: LogContext) => {
  logger.warn(message, context);
};

export const logInfo = (message: string, context?: LogContext) => {
  logger.info(message, context);
};

export const logDebug = (message: string, context?: LogContext) => {
  logger.debug(message, context);
};

/**
 * Error boundary helper for logging React errors
 */
export const logReactError = (
  error: Error,
  errorInfo: { componentStack: string }
) => {
  logger.error("React Error Boundary caught an error", error, {
    componentStack: errorInfo.componentStack,
  });
};

/**
 * API error logging helper
 */
export const logApiError = (
  endpoint: string,
  method: string,
  error: Error,
  statusCode?: number,
  requestData?: unknown
) => {
  logger.error(`API Error: ${method} ${endpoint}`, error, {
    endpoint,
    method,
    statusCode,
    requestData,
  });
};
