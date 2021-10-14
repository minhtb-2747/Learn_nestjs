import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from 'src/dto/auth/signUpDto.dto';
import { AuthService } from './auth.service';

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

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log('req', req?.user)
    }
}
