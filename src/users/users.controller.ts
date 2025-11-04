import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/loing.dto";

@Controller("api/users")
export class UserController {
    constructor (private readonly usersService : UsersService) {}

    @Get()  
    public getAllUsers() {
        return this.usersService.getAllUsers() ; 
    }


    @Post("/auth/register") 
    public registerUser(@Body() body : RegisterDto) {
        return this.usersService.register(body) ; 
    }

    @Post("/auth/login") // 201 
    @HttpCode(HttpStatus.OK) // 200 
    public loginUser(@Body() body : LoginDto) {
        return this.usersService.login(body) ; 
    }

}