import { Injectable } from '@nestjs/common';
import { AbstractAccountRepository } from '../../domain/repositories/account.abstract-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrmAccountEntity } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { Account } from '../../domain/aggregates/account.aggregate-root';
import { AccountId } from '../../domain/value-objects/account-id.vo';
import { EmailAddress } from '../../domain/value-objects/email-address.vo';
import { AccountMapper } from '../mapper/account.mapper';

@Injectable()
export class PostgresAccountRepository extends AbstractAccountRepository {
  private _accountRepository: Repository<OrmAccountEntity>;

  constructor(
    @InjectRepository(OrmAccountEntity)
    private readonly accountRepo: Repository<OrmAccountEntity>,
  ) {
    super();
    this._accountRepository = accountRepo;
  }

  async save(account: Account): Promise<void> {
    const toOrmEntity = AccountMapper.toOrmEntity(account);

    await this._accountRepository.save(toOrmEntity);
  }

  async findById(id: AccountId): Promise<Account | null> {
    const account = await this._accountRepository.findOneBy({
      id: id.getValue,
    });

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }

  async findByEmail(email: EmailAddress): Promise<Account | null> {
    const account = await this._accountRepository.findOneBy({
      email: email.getValue,
    });

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }
}
