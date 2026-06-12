import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/users/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/users/use-cases/delete-user.use-case';
import { GetUserByIdUseCase } from '../../application/users/use-cases/get-user-by-id.use-case';
import { ListUsersUseCase } from '../../application/users/use-cases/list-users.use-case';
import { UpdateUserUseCase } from '../../application/users/use-cases/update-user.use-case';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute(body);
    return UserResponseDto.fromDomain(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const users = await this.listUsersUseCase.execute();
    return users.map((user) => UserResponseDto.fromDomain(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(id);
    return UserResponseDto.fromDomain(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.updateUserUseCase.execute(id, body);
    return UserResponseDto.fromDomain(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {  
    return await this.deleteUserUseCase.execute(id);
  }
}
