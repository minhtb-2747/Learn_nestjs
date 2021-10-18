import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../dto/auth/signUpDto.dto';
import { UsersRepository } from './user.respository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository, private jwtService: JwtService) { }
    
    async singUp(data: SignUpDto): Promise<void>{
        const { username, password } = data;
        // Check username empty
        if (!username)
            throw new NotFoundException('Username not found');
        
        // Check password empty
        if (!password)
            throw new NotFoundException('Password not found')
        
        // hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        console.log('hashPassword', hashPassword);
        const user = await this.usersRepository.create({
            username,
            password: hashPassword,
        })
        try {
            await this.usersRepository.save(user);
        } catch (error) {
            if (error?.code === "23505") {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async singIn(data: SignUpDto): Promise<{ accessToken: string }>{
        const { username, password } = data;
        // Check username empty
        if (!username)
            throw new NotFoundException('Username not found');
        
        // Check password empty
        if (!password)
            throw new NotFoundException('Password not found')
        
        const getUser = await this.usersRepository.findOne({ username });

        if (!getUser) {
            throw new NotFoundException(`Username: ${username} invalid`);
        } else {
            const validPass = await bcrypt.compare(password, getUser?.password);

            if (!validPass)
                throw new UnauthorizedException();
            else {
                const accessToken = await this.jwtService.sign({ username });
                console.log('accessToken',accessToken)
                return {accessToken};
            }
        }
    }

    async getUsers(): Promise<any>{
        const builder = this.usersRepository.createQueryBuilder('user');
        const users = await builder.getMany()
        return users
    }
}
