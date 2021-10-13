import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';


export class SignUpDto {
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}