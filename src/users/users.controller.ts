import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("api/users")
export class UserController {
    constructor (private readonly usersService : UsersService) {}

    @Get()  
    public getAllUsers() {
        return this.usersService.getAllUsers() ; 
    }

}