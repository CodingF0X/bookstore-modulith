import { AbstractHashPassword } from '../../application/ports/hash-password.abstract';
import * as bcrypt from 'bcryptjs';

export class PasswordHashing extends AbstractHashPassword {
  private readonly saltRounds: number = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
