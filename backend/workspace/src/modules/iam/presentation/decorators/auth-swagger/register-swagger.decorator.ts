import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateAccountReqDTO } from '../../DTO/req/create-account.req-dto';
import { CreateAccountResDTO } from '../../DTO/res/create-account.res-dto';

export function SwaggerRegisterDocs(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a user',
      description: 'Register new user account.',
    }),
    ApiBody({
      type: CreateAccountReqDTO,
    }),
    ApiOkResponse({
      description: 'Account successfully created.',
      type: CreateAccountResDTO,
      example: {
        accountId: 'b2b2d58c-ea2c-46b5-8595-d508a9405cf8',
        email: 'mmea3@gmail.com',
        isActive: true,
        lastLogin: null,
        role: ['CUSTOMER'],
      },
    }),
    ApiUnprocessableEntityResponse({
      description:
        'Validation failed (e.g., invalid email or password format).',
    }),
  );
}
