export abstract class AbstractTokenGenerator {
  abstract generateToken(
    accountId: string,
    email: string,
    roles: string[],
    tokenVersion: number,
  ): Promise<string>;
}
