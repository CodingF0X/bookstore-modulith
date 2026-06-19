import { AbstractHashPassword } from '../../application/ports/hash-password.abstract';
import * as bcrypt from 'bcryptjs';

export class PasswordHashing extends AbstractHashPassword {
  private readonly saltRounds: number = 10;

  async hash(password: string): Promise<string> {
    const hashedPWD = await bcrypt.hash(password, this.saltRounds);
    return hashedPWD;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const pwd = await bcrypt.compare(password, hash);

    if (!pwd) throw new Error('Password is Incorrect!!! ');

    return pwd;
  }
}
