import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './user.respository';
import { PassportModule } from '@nestjs/passport';
import {JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './auth.constants';
import { JwtStrategy } from 'src/middleware/jwt.stratery';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: JwtConstants.secret,
        signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService, JwtStrategy, ],
  controllers: [AuthController],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
