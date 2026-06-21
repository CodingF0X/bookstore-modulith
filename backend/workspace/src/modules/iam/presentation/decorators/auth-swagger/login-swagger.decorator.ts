import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { LoginReqDTO } from '../../DTO/req/login-request.dto';
import { LoginResDTO } from '../../DTO/res/login-response.dto';

export function SwaggerLoginDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate a user',
      description: 'Validates credentials and returns a JWT access token.',
    }),
    ApiBody({
      type: LoginReqDTO,
    }),
    ApiOkResponse({
      description: 'Successfully authenticated.',
      type: LoginResDTO,
    }),
    ApiUnprocessableEntityResponse({
      description: 'Validation failed (e.g., invalid email format).',
    }),
    ApiUnauthorizedResponse({
      description: 'Invalid credentials or the account has been deactivated.',
    }),
  );
}
