import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';

// WHY THIS FILTER EXISTS: All errors must return { statusCode, message, errorCode }.
// Without this filter, unhandled errors return NestJS's default shape which differs.
// This filter is the single point of truth for the error response shape (BK-09).
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message ?? message;
        errorCode = (exceptionResponse as any).errorCode ?? errorCode;
      } else {
        message = exceptionResponse as string;
      }
    }

    if (statusCode >= 500) {
      this.logger.error(
        `${request.method} ${request.path} → ${statusCode}: ${message}`,
        exception instanceof Error ? exception.stack : String(exception),
        'GlobalExceptionFilter',
      );
    }

    response.status(statusCode).json({ statusCode, message, errorCode });
  }
}
