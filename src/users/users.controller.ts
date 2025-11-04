import { Body, Controller, Get, Headers, HttpCode, HttpStatus,Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/loing.dto";
import { AuthGuard } from "./guards/auth.guard";
import type { JWTPayloadType } from "src/utils/types";
import { CurrentUser } from "./decorators/current_user.decorator";
import { Roles } from "./decorators/user.role.decorator";
import { UserType } from "src/utils/enums";
import { AuthRoleGuard } from "./guards/auth-roles.guard";

@Controller("api/users")
export class UserController {
    constructor (private readonly usersService : UsersService) {}

    @Post("/auth/register") 
    public registerUser(@Body() body : RegisterDto) {
        return this.usersService.register(body) ; 
    }

    @Post("/auth/login") // 201 
    @HttpCode(HttpStatus.OK) // 200 
    public loginUser(@Body() body : LoginDto) {
        return this.usersService.login(body) ; 
    }


    @Get("/current-user")  
    @UseGuards(AuthGuard)
    public getCurrentUser(@CurrentUser() user : JWTPayloadType) {
        const id = user.id; 
        return this.usersService.getCurrentUser(id) ; 
    }


    @Get() 
    @Roles(UserType.ADMIN)
    @UseGuards(AuthRoleGuard)
    public getAllUsers() {
        return this.usersService.getAllUsers() ; 
    }
}