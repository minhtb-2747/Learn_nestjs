import { Controller, Post, Body } from '@nestjs/common';
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
}
