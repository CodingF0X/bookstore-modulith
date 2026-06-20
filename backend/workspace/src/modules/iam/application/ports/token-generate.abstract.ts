export abstract class AbstractTokenGenerator {
  // It takes the user's ID and Email, and returns a string (the token)
  abstract generateToken(
    accountId: string,
    email: string,
    roles: string[],
  ): Promise<string>;
}
