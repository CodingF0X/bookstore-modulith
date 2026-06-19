export abstract class TokenGenerator {
  // It takes the user's ID and Email, and returns a string (the token)
  abstract generateToken(accountId: string, email: string): Promise<string>;
}
