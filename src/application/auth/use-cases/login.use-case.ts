import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_HASHER, USER_REPOSITORY } from '../../../common/tokens';
import type { UserRepository } from '../../../domain/users/repositories/user-repository.interface';
import type { PasswordHasher } from '../../../domain/users/services/password-hasher.interface';

export type LoginInput = {
  email: string;
  password: string;
};

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginInput): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { accessToken };
  }
}
