import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUseCase } from '../application/auth/use-cases/login.use-case';
import { AuthController } from '../presentation/auth/auth.controller';
import { JwtStrategy } from '../presentation/auth/strategies/jwt.strategy';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'change_me_secret'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, JwtStrategy],
})
export class AuthModule {}
