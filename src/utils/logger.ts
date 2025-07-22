import pino from 'pino';

/**
 * Logger configuration using Pino.
 */
const logger = pino({
  level: process.env.LOG_LEVEL || 'info', // Default log level
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime, // Use ISO timestamp format
});

export default logger;
