import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUserByIdentifierResDTO } from '../../DTO/res';

export function SwaggerGetUserByEmailDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a single user',
      description: 'Get a single user by Email',
    }),
    ApiOkResponse({
      description: 'Successfully fetched the User details',
      type: GetUserByIdentifierResDTO,
    }),
    ApiUnprocessableEntityResponse({
      description: 'Validation failed (e.g., invalid email format).',
    }),
    ApiUnauthorizedResponse({
      description:
        'Invalid Token or the account has been deactivated or the account do not exist.',
    }),
  );
}
