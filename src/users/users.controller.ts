import { Controller, Get } from "@nestjs/common";

@Controller("api/users")
export class UserController {

    @Get()  
    public getAllUsers() {

        return [

            {id : 1 , name : "ahmed matter"} , 
        ] ; 
    }

}