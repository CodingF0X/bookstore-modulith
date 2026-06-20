import { Injectable } from '@nestjs/common';
import { AbstractPinoLogger } from '../../application/ports/logger.abstract';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class PinoLoggerAdapter extends AbstractPinoLogger {
  constructor(private readonly pinoLogger: PinoLogger) {
    super();
  }

  log(message: string, context?: string): void {
    this.pinoLogger.info({ context: context }, message);
  }

  warn(message: string, context?: string): void {
    this.pinoLogger.warn({ context: context }, message);
  }

  error(message: string, trace?: string, context?: string): void {
    this.pinoLogger.error({ context: trace, trace: trace }, message);
  }
}
