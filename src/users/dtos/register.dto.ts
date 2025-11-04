import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    
    @IsString() 
    @IsOptional() 
    @Length(2 , 150)
    username : string ; 

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(250)
    email : string ; 


    @IsString() 
    @IsNotEmpty() 
    @MinLength(6) 
    password : string ; 
}