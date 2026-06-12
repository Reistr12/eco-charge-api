import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PASSWORD_HASHER, USER_REPOSITORY } from '../../../common/tokens';
import { User } from '../../../domain/users/entities/user';
import {
  UpdateUserRepositoryInput,
} from '../../../domain/users/repositories/user-repository.interface';
import type { UserRepository } from '../../../domain/users/repositories/user-repository.interface';
import type { PasswordHasher } from '../../../domain/users/services/password-hasher.interface';

export type UpdateUserInput = UpdateUserRepositoryInput;

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(id: string, input: UpdateUserInput): Promise<User> {
    const currentUser = await this.userRepository.findById(id);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    if (input.email && input.email !== currentUser.email) {
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
    }

    const dataToUpdate: UpdateUserRepositoryInput = { ...input };

    if (input.password) {
      dataToUpdate.password = await this.passwordHasher.hash(input.password);
    }

    const updatedUser = await this.userRepository.update(id, dataToUpdate);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }
}
