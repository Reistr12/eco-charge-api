import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../common/tokens';
import { User } from '../../../domain/users/entities/user';
import type { UserRepository } from '../../../domain/users/repositories/user-repository.interface';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
