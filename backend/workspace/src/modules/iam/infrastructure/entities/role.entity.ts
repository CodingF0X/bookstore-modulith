import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Role } from '../../domain/value-objects/role.enum';
import { OrmAccountEntity } from './account.entity';

@Entity({ name: 'account_roles', schema: 'iam' })
export class OrmRoleEntity {
  @PrimaryColumn({ name: 'account_id', type: 'uuid' })
  accountId!: string;

  @PrimaryColumn({ name: 'role_name', type: 'varchar', length: 50 })
  roleName!: Role;

  @CreateDateColumn({ name: 'granted_at', type: 'timestamptz' })
  grantedAt!: Date;

  @ManyToOne(() => OrmAccountEntity, (account) => account.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account!: OrmAccountEntity;
}
