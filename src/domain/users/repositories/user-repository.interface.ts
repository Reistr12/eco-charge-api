import { User } from '../entities/user';
import { UserRole } from '../enums/user-role.enum';

export type CreateUserRepositoryInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UpdateUserRepositoryInput = Partial<{
  name: string;
  email: string;
  password: string;
  role: UserRole;
}>;

export interface UserRepository {
  create(input: CreateUserRepositoryInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, input: UpdateUserRepositoryInput): Promise<User | null>;
  delete(id: string): Promise<void>;
}
