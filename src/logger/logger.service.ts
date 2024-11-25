import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { resolve } from 'path';
import { mkdir, appendFile, stat, rename } from 'fs/promises'

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logDir = process.env.LOG_DIR || '/app/logs';
  private logFile = resolve(this.logDir, 'app.log');
  private maxFileSize = parseInt(process.env.LOG_FILE_MAX_SIZE || '1024', 10) * 1024;
  private logLevel: LogLevel[]

  constructor() {
    super();

    const configuredLevel = process.env.LOG_LEVEl || 'log';
    this.logLevel = this.getLogLevels(configuredLevel)
    super.setLogLevels(this.logLevel);

    this.initLogDirectory()

    process.on('uncaughtException', (err) => {
      this.error('Uncaught Exception', err.stack)
    })

    process.on('unhandledRejection', (reason) => {
      this.error('Unhandled Rejection', reason instanceof Error ? reason.stack : String(reason))
    })
  }

  private async initLogDirectory(): Promise<void> {
    try {
      await mkdir(this.logDir, { recursive: true })
    } catch (error) {
      super.error(`Failed to create log dir: ${(error as Error).message}`)
    }
  }

  private getLogLevels(level: string): LogLevel[] {
    switch (level) {
      case 'error':
        return ['error'];
      case 'warn':
        return ['error', 'warn'];
      case 'log':
        return ['error', 'warn', 'log'];
      case 'debug':
        return ['error', 'warn', 'log', 'debug'];
      default:
        return ['error', 'warn', 'log', 'debug', 'verbose'];
    }
  }

  log(message: string, context?: string): void {
    if (this.logLevel.includes('log')) {
      this.writeLog('LOG', message, context)
    }
    super.log(message, context)
  }

  error(message: string, stack?: string, context?: string): void {
    if (this.logLevel.includes('error')) {
      this.writeLog('ERROR', `${message} ${stack || ''}`, context)
    }
    super.error(message, stack, context)
  }

  warn(message: string, context?: string): void {
    if (this.logLevel.includes('warn')) {
      this.writeLog('WARN', message, context)
    }
    super.warn(message, context)
  }

  debug(message: string, context?: string): void {
    if (this.logLevel.includes('debug')) {
      this.writeLog('DEBUG', message, context)
    }
    super.debug(message, context)
  }

  verbose(message: string, context?: string): void {
    if (this.logLevel.includes('verbose')) {
      this.writeLog('VERBOSE', message, context)
    }
    super.verbose(message, context)
  }

  private async writeLog(level: string, message: string, context?: string): Promise<void> {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${context ? `[${context}]` : ''}${message}\n`;
    try {
      await appendFile(this.logFile, logEntry)
      await this.rotateLogs()
    } catch (error) {
      super.error(`Failed to write log: ${(error as Error).message}`)
    }
  }

  private async rotateLogs(): Promise<void> {
    try {
      const stats = await stat(this.logFile)
      if (stats.size > this.maxFileSize) {
        const rotatedLogFile = `${this.logFile}.${Date.now()}`;
        await rename(this.logFile, rotatedLogFile)
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        super.error(`Failed to rotate log: ${error.message}`)
      }
    }
  }
}
