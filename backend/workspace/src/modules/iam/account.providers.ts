import { Provider } from '@nestjs/common';
import { CreateAccountUseCase } from './application/use-cases/account/create-account.use-case';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';
import { AbstractHashPassword } from './application/ports/hash-password.abstract';
import { LoginUseCase } from './application/use-cases/account/login.use-case';
import { AbstractTokenGenerator } from './application/ports/token-generate.abstract';
import { AbstractPinoLogger } from './application/ports/logger.abstract';

export const UseCaseProviders: Provider[] = [
  {
    provide: CreateAccountUseCase,
    useFactory: (
      accountRepo: AbstractAccountRepository,
      hashPassword: AbstractHashPassword,
      pinoLogger: AbstractPinoLogger,
    ) => {
      return new CreateAccountUseCase(accountRepo, hashPassword, pinoLogger);
    },
    inject: [
      AbstractAccountRepository,
      AbstractHashPassword,
      AbstractPinoLogger,
    ],
  },

  {
    provide: LoginUseCase,
    useFactory: (
      accountRepo: AbstractAccountRepository,
      hashPassword: AbstractHashPassword,
      tokenGenerator: AbstractTokenGenerator,
      pinoLogger: AbstractPinoLogger,
    ) => {
      return new LoginUseCase(
        accountRepo,
        hashPassword,
        tokenGenerator,
        pinoLogger,
      );
    },
    inject: [
      AbstractAccountRepository,
      AbstractHashPassword,
      AbstractTokenGenerator,
      AbstractPinoLogger,
    ],
  },
];
