import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrmRoleEntity } from './role.entity';

@Entity({ name: 'accounts', schema: 'iam' })
export class OrmAccountEntity {
  //  we use PrimaryColumn instead of PrimaryGeneratedColumn
  // because the Domain Layer (AccountId VO) dictates the ID generation!
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email!: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password_hash!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  last_login_at!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at!: Date;

  // cascade: true allows us to save the Account and all its new roles/tokens
  // in a single repository.save() call.
  @OneToMany(() => OrmRoleEntity, (role) => role.account, {
    cascade: true,
    eager: true, // We want to load roles automatically for JWT generation})
  })
  roles!: OrmRoleEntity[];

  @Column({ name: 'token_version', type: 'int', default: 0 })
  tokenVersion!: number;
}
