import { InvalidRoleAssignmentException } from '../exceptions/role-assign.exception';
import { AccountId } from '../value-objects/account-id.vo';
import { EmailAddress } from '../value-objects/email-address.vo';
import { PasswordHash } from '../value-objects/password-hash.vo';
import { Role } from '../value-objects/role.enum';
import { AccountRole } from './child-entities/account-role.entity';

export class Account {
  private _id!: AccountId;
  private _email!: EmailAddress;
  private _passwordHash!: PasswordHash;
  private _isActive!: boolean;
  private _lastLogin!: Date | null;

  private _roles: AccountRole[] = [];

  private constructor() {}

  public static registerNew(
    id: AccountId,
    email: EmailAddress,
    password: PasswordHash,
  ): Account {
    const account = new Account();

    account._id = id;
    account._email = email;
    account._passwordHash = password;
    account._isActive = true;
    account._lastLogin = null;
    account._roles.push(new AccountRole(Role.CUSTOMER));

    return account;
  }

  public static loadExisting(
    id: AccountId,
    email: EmailAddress,
    passwordHash: PasswordHash,
    isActive: boolean,
    lastLoginAt: Date | null,
    roles: AccountRole[],
  ): Account {
    const account = new Account();
    account._id = id;
    account._email = email;
    account._passwordHash = passwordHash;
    account._isActive = isActive;
    account._lastLogin = lastLoginAt;
    account._roles = roles;

    return account;
  }

  //-- Behaviors --//

  public assignRole(role: Role): void {
    if (!this._isActive) throw new InvalidRoleAssignmentException();

    const alreadyHasRole = this._roles.some((r) => r.roleName === role);
    if (!alreadyHasRole) {
      this._roles.push(new AccountRole(role));
    }
  }

  get id(): AccountId {
    return this._id;
  }
  get email(): EmailAddress {
    return this._email;
  }
  get passwordHash(): PasswordHash {
    return this._passwordHash;
  }
  get isActive(): boolean {
    return this._isActive;
  }
  get lastLogin(): Date | null {
    return this._lastLogin;
  }
  get role(): ReadonlyArray<AccountRole> {
    return this._roles;
  }
}
