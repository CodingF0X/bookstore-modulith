import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { Role } from 'src/modules/iam/domain/value-objects/role.enum';

export class CreateAccountResDTO {
  private accountId!: string;
  private email!: string;
  private isActive!: boolean;
  private lastLogin!: Date | null;
  private role!: readonly Role[];

  constructor(account: Account) {
    this.accountId = account.id.getValue;
    this.email = account.email.getValue;
    this.isActive = account.isActive;
    this.lastLogin = account.lastLogin;
    this.role = account.role.map((r) => r.roleName);
  }
}
