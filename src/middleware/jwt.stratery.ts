import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from '../auth/auth.constants';
import { User } from '../auth/user.entity';
import { UsersRepository } from '../auth/user.respository';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {
        super({
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: {username: string}) : Promise<User> {
        const { username } = payload;
        const user = this.usersRepository.findOne({ username });

        if (!user)
            throw new UnauthorizedException()
        return user;
    }
}