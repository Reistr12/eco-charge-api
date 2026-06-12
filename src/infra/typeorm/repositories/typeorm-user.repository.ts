import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/users/entities/user';
import { UserRole } from '../../../domain/users/enums/user-role.enum';
import {
  CreateUserRepositoryInput,
  UpdateUserRepositoryInput,
  UserRepository,
} from '../../../domain/users/repositories/user-repository.interface';
import { UserRoleEnum } from '../entities/enums/user-role.enum';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(input: CreateUserRepositoryInput): Promise<User> {
    const entity = this.repository.create({
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role as unknown as UserRoleEnum,
    });

    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return entities.map((entity) => this.toDomain(entity));
  }

  async update(id: string, input: UpdateUserRepositoryInput): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      return null;
    }

    if (input.name !== undefined) {
      entity.name = input.name;
    }

    if (input.email !== undefined) {
      entity.email = input.email;
    }

    if (input.password !== undefined) {
      entity.password = input.password;
    }

    if (input.role !== undefined) {
      entity.role = input.role as unknown as UserRoleEnum;
    }

    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  private toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role as unknown as UserRole,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
