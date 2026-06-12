import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PASSWORD_HASHER, USER_REPOSITORY } from '../../../common/tokens';
import {
  CreateUserRepositoryInput,
} from '../../../domain/users/repositories/user-repository.interface';
import { User } from '../../../domain/users/entities/user';
import type { UserRepository } from '../../../domain/users/repositories/user-repository.interface';
import type { PasswordHasher } from '../../../domain/users/services/password-hasher.interface';

export type CreateUserInput = CreateUserRepositoryInput;

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await this.passwordHasher.hash(input.password);

    return this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
  }
}
