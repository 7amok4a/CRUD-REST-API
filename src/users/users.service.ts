import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    
    public getAllUsers() {

        return [

            {id : 1 , name : "ahmed matter"} , 
        ] ; 
    }
}