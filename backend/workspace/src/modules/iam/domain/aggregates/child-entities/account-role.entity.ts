import { Role } from '../../value-objects/role.enum';

export class AccountRole {
  public readonly roleName: Role;
  public readonly grantedAt: Date;

  constructor(roleName: Role, grantedAt: Date = new Date()) {
    this.roleName = roleName;
    this.grantedAt = grantedAt;
  }
}
