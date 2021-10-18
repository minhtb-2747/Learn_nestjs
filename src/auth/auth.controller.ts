import { Controller, Post, Body, Get, Req, UseGuards, Logger, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from '../dto/auth/signUpDto.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    
    @Post("/signup")
    singUp(@Body() data: SignUpDto): Promise<void>{
        return this.authService.singUp(data);
    }


    @Post("/signin")
    singIn(@Body() data: SignUpDto): Promise<{accessToken: string}>{
        return this.authService.singIn(data);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("/users")
    // @UseGuards(AuthGuard())
    getUsers():Promise<User> {
        return this.authService.getUsers();
    }

}
