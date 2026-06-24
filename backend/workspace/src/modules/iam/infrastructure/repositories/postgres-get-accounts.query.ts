import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AbstractAccountsQuery,
  IAccountReadModel,
  IPaginatedAccountsResult,
} from '../../application/queries/get-accounts';
import { OrmAccountEntity } from '../entities/account.entity';

@Injectable()
export class PostgresGetAccountsQuery implements AbstractAccountsQuery {
  constructor(
    @InjectRepository(OrmAccountEntity)
    private readonly _typeOrmRepo: Repository<OrmAccountEntity>,
  ) {}

  async getAllAccounts(
    page: number,
    limit: number,
  ): Promise<IPaginatedAccountsResult> {
    const skip = (page - 1) * limit;

    const [rawAccounts, total] = await this._typeOrmRepo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.roles', 'role')
      .select([
        'account.id',
        'account.email',
        'account.isActive',
        'account.lastLoginAt',
        'account.createdAt',
        'role.roleName',
      ])
      // This will no longer crash
      .orderBy('account.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const mappedData: IAccountReadModel[] = rawAccounts.map((acc) => ({
      id: acc.id,
      email: acc.email,
      // Mapping is cleaner too!
      isActive: acc.isActive,
      lastLoginAt: acc.lastLoginAt,
      roles: acc.roles.map((r) => r.roleName),
    }));

    return {
      data: mappedData,
      total,
      page,
      limit,
    };
  }
}
