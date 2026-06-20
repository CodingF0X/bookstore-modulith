import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Type,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { InvalidEmailException } from '../../domain/exceptions/invalid-email.exception';
import { EmailAlreadyExistsException } from '../../application/exceptions/duplicate-email.exception';
import { InvalidLoginCredentials } from '../../application/exceptions/invalid-login-credentials.exception';

// This decorator tells NestJS to only catch our pure Domain Exceptions
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly exceptionsMapping = new Map<
    Type<DomainException>,
    HttpStatus
  >([
    [InvalidEmailException, HttpStatus.BAD_REQUEST],
    [EmailAlreadyExistsException, HttpStatus.CONFLICT],
    [InvalidLoginCredentials, HttpStatus.BAD_REQUEST],
  ]);

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Default to 400 Bad Request
    let status = HttpStatus.BAD_REQUEST;

    // translate specific business errors into specific HTTP codes by reading the map
    for (const [
      exceptionClass,
      httpStatus,
    ] of this.exceptionsMapping.entries()) {
      if (exception instanceof exceptionClass) {
        status = httpStatus;
        break;
      }
    }

    // Send the standardized JSON response to the user
    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
