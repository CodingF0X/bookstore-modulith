export interface IPasswordHasher {
  hash(rawPassword: string): Promise<string>;
  compare(rawPassword: string, hashedValue: string): Promise<boolean>;
}
