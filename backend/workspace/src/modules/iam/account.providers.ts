import { Provider } from '@nestjs/common';
import { CreateAccountUseCase } from './application/use-cases/account/create-account.use-case';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';
import { AbstractHashPassword } from './application/ports/hash-password.abstract';
import { LoginUseCase } from './application/use-cases/account/login.use-case';
import { AbstractTokenGenerator } from './application/ports/token-generate.abstract';

export const UseCaseProviders: Provider[] = [
  {
    provide: CreateAccountUseCase,
    useFactory: (
      accountRepo: AbstractAccountRepository,
      hashPassword: AbstractHashPassword,
    ) => {
      return new CreateAccountUseCase(accountRepo, hashPassword);
    },
    inject: [AbstractAccountRepository, AbstractHashPassword],
  },

  {
    provide: LoginUseCase,
    useFactory: (
      accountRepo: AbstractAccountRepository,
      hashPassword: AbstractHashPassword,
      tokenGenerator: AbstractTokenGenerator,
    ) => {
      return new LoginUseCase(accountRepo, hashPassword, tokenGenerator);
    },

    inject: [
      AbstractAccountRepository,
      AbstractHashPassword,
      AbstractTokenGenerator,
    ],
  },
];
