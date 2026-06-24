import { Provider } from '@nestjs/common';
import { GetUserByIdUseCase } from './application/use-cases/account';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';
import { GetUserByEmailUseCase } from './application/use-cases/account/get-userByEmail.use-case';

export const AccountUseCaseProviders: Provider[] = [
  {
    provide: GetUserByIdUseCase,
    useFactory: (accountRepo: AbstractAccountRepository) => {
      return new GetUserByIdUseCase(accountRepo);
    },
    inject: [AbstractAccountRepository],
  },

  {
    provide: GetUserByEmailUseCase,
    useFactory: (accountRepo: AbstractAccountRepository) => {
      return new GetUserByEmailUseCase(accountRepo);
    },
    inject: [AbstractAccountRepository],
  },
];
