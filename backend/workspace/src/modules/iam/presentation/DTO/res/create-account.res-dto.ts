import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { Role } from 'src/modules/iam/domain/value-objects/role.enum';

export class CreateAccountResDTO {
  @ApiProperty({ description: 'The account ID' })
  public readonly accountId!: string;

  @ApiProperty({ description: 'The email address' })
  public readonly email!: string;

  @ApiProperty({ description: 'Whether the account is active' })
  public readonly isActive!: boolean;

  @ApiProperty({
    description: 'The last login date',
    nullable: true,
    type: Date,
  })
  public readonly lastLogin!: Date | null;

  @ApiProperty({
    description: 'The roles assigned to the account',
    enum: Role,
    isArray: true,
  })
  public readonly role!: readonly Role[];

  constructor(account: Account) {
    this.accountId = account.id.getValue;
    this.email = account.email.getValue;
    this.isActive = account.isActive;
    this.lastLogin = account.lastLogin;
    this.role = account.role.map((r) => r.roleName);
  }
}
