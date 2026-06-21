import { Provider } from '@nestjs/common';
import { GetUserByIdUseCase } from './application/use-cases/account';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';

export const AccountUseCaseProviders: Provider[] = [
  {
    provide: GetUserByIdUseCase,
    useFactory: (accountRepo: AbstractAccountRepository) => {
      return new GetUserByIdUseCase(accountRepo);
    },
    inject: [AbstractAccountRepository],
  },
];
