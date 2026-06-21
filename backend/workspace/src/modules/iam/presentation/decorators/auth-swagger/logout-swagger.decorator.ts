import { applyDecorators } from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function SwaggerLogoutDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout a user',
      description:
        'Increments the TokenVersion and returns no-content response',
    }),
    ApiNoContentResponse({
      description: 'Successfully Logged out.',
      type: '',
    }),
    ApiUnprocessableEntityResponse({
      description: 'Validation failed (e.g., invalid token format).',
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid Token or the account has been deactivated.',
    }),
  );
}
