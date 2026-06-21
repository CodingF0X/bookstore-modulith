import { Account } from '../../domain/aggregates/account.aggregate-root';
import { AccountRole } from '../../domain/aggregates/child-entities/account-role.entity';
import { AccountId } from '../../domain/value-objects/account-id.vo';
import { EmailAddress } from '../../domain/value-objects/email-address.vo';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { OrmAccountEntity } from '../entities/account.entity';
import { OrmRoleEntity } from '../entities/role.entity';

export class AccountMapper {
  public static toDomain(orm: OrmAccountEntity) {
    const accountIdVO = AccountId.create(orm.id);
    const emailVO = EmailAddress.create(orm.email);
    const passwordVO = PasswordHash.create(orm.password_hash);

    const roles = orm.roles
      ? orm.roles.map((r) => new AccountRole(r.roleName, r.grantedAt))
      : [];

    return Account.loadExisting(
      accountIdVO,
      emailVO,
      passwordVO,
      orm.is_active,
      orm.last_login_at,
      roles,
      orm.tokenVersion,
    );
  }

  public static toOrmEntity(domain: Account): OrmAccountEntity {
    const ormEntity = new OrmAccountEntity();

    // 1. Extract raw primitives from the Value Objects
    ormEntity.id = domain.id.getValue;
    ormEntity.email = domain.email.getValue;
    ormEntity.password_hash = domain.passwordHash.getValue;

    // 2. Extract standard properties
    ormEntity.is_active = domain.isActive;
    ormEntity.last_login_at = domain.lastLogin;
    ormEntity.tokenVersion = domain.tokenVersion;

    // 3. Map Child Entities to ORM Entities

    ormEntity.roles = domain.role.map((r) => {
      const roleORM = new OrmRoleEntity();
      roleORM.accountId = domain.id.getValue;
      roleORM.roleName = r.roleName;
      roleORM.grantedAt = r.grantedAt;

      return roleORM;
    });

    return ormEntity;
  }
}
