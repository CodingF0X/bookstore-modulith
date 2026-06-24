import { IAccountReadModel } from './account-read.model';
//we define exactly what data the UI needs and create the interface. Because this is a list,
// we must include pagination to ensure the database doesn't try to return a million rows at once.
export interface IPaginatedAccountsResult {
  data: IAccountReadModel[];
  total: number;
  page: number;
  limit: number;
}
