import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from '../application/users/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../application/users/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '../application/users/use-cases/get-user-by-id.use-case';
import { ListUsersUseCase } from '../application/users/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '../application/users/use-cases/update-user.use-case';
import { PASSWORD_HASHER, USER_REPOSITORY } from '../common/tokens';
import { BcryptPasswordHasherService } from '../infra/security/bcrypt-password-hasher.service';
import { UserEntity } from '../infra/typeorm/entities/user.entity';
import { TypeormUserRepository } from '../infra/typeorm/repositories/typeorm-user.repository';
import { UsersController } from '../presentation/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: TypeormUserRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: BcryptPasswordHasherService,
    },
  ],
  exports: [USER_REPOSITORY, PASSWORD_HASHER],
})
export class UsersModule {}
