import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcryptjs" 
import { LoginDto } from "./dtos/loing.dto";
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepositiry : Repository<User>) {}
    

    public  async getAllUsers() {
        return await this.userRepositiry.find() ; 
    }


    public async register (registerDto : RegisterDto) {
        const {email , password , username } = registerDto ; 
        const userFound = await this.userRepositiry.findOne ({where : {email}}) 
        if (userFound) 
            throw new BadRequestException("user already found") ; 
        const salt = await bcrypt.genSalt(10) ; 
        const hashPassword = await bcrypt.hash(password , salt) ; 

        let newUser = this.userRepositiry.create({email , username , password : hashPassword}) ; 
        newUser = await this.userRepositiry.save(newUser) ;   
        
        return newUser ; 
    }



    public async login (loginDto: LoginDto) {
        const {email , password}  = loginDto ; 
        const user = await this.userRepositiry.findOne ({where : {email}}) 
        if (!user) 
            throw new BadRequestException("user not found") ;

        const compare = await bcrypt.compare(password , user.password) ; 

        if (!compare) 
            throw new BadRequestException("password is not correct") ; 
        
        return user ; 
    }
}