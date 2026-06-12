import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../domain/users/services/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasherService implements PasswordHasher {
  private static readonly SALT_ROUNDS = 10;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, BcryptPasswordHasherService.SALT_ROUNDS);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
