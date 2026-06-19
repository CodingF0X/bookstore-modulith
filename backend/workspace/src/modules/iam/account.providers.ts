import { Provider } from '@nestjs/common';
import { CreateAccountUseCase } from './application/use-cases/account/create-account.use-case';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';
import { AbstractHashPassword } from './application/ports/hash-password.abstract';

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
];
