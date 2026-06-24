export interface IAccountReadModel {
  id: string;
  email: string;
  isActive: boolean;
  lastLoginAt: Date | null;
  roles: string[];
}
