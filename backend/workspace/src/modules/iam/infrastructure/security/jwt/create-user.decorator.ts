import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Account | undefined => {
    const req = ctx.switchToHttp().getRequest<Request>();

    return req.user as Account | undefined;
  },
);
