import { IPaginatedAccountsResult } from './paginated-results.model';

export abstract class AbstractAccountsQuery {
  abstract getAllAccounts(
    limit: number,
    offset: number,
  ): Promise<IPaginatedAccountsResult>;
}
