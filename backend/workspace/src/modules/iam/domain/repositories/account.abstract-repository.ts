import { Account } from '../aggregates/account.aggregate-root';
import { AccountId } from '../value-objects/account-id.vo';
import { EmailAddress } from '../value-objects/email-address.vo';

export abstract class AbstractAccountRepository {
  abstract save(account: Account): Promise<void>;
  abstract findById(id: AccountId): Promise<Account | null>;
  abstract findByEmail(email: EmailAddress): Promise<Account | null>;
}
