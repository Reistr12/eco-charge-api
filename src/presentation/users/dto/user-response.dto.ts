import { User } from '../../../domain/users/entities/user';
import { UserRole } from '../../../domain/users/enums/user-role.enum';

export class UserResponseDto {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;

  static fromDomain(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
