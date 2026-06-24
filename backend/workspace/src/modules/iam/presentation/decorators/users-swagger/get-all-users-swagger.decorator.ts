import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { singleAccountResDTO } from '../../DTO/res/query-single-account.res-dto';

export function SwaggerGetAllUsersDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get many user',
      description:
        'Get users based on total number and limit of requested columns',
    }),
    ApiOkResponse({
      description: 'Successfully fetched the User details',
      type: [singleAccountResDTO],
    }),
    ApiUnprocessableEntityResponse({
      description: 'Users do not exist.',
    }),
    ApiUnauthorizedResponse({
      description:
        'Invalid Token or the account has been deactivated or the account do not exist.',
    }),
  );
}
