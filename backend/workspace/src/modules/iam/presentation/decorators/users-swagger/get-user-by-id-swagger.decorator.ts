import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { GetUserbyIdResDTO } from '../../DTO/res';

export function SwaggergetUserByIdDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get a single user',
      description: 'Get a single user by ID',
    }),
    ApiOkResponse({
      description: 'Successfully fetched the User details',
      type: GetUserbyIdResDTO,
    }),
    ApiUnprocessableEntityResponse({
      description: 'Validation failed (e.g., invalid Id format).',
    }),
    ApiUnauthorizedResponse({
      description:
        'Invalid Token or the account has been deactivated or the account do not exist.',
    }),
  );
}
