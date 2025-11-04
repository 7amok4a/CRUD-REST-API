import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcryptjs" 
import { LoginDto } from "./dtos/loing.dto";
import { JwtService } from "@nestjs/jwt";
import { AcessTokenType, JWTPayloadType } from "src/utils/types";
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly userRepositiry : Repository<User> , 
            private readonly jwtService : JwtService) {}
    

    public async register (registerDto : RegisterDto)  : Promise<AcessTokenType>{
        const {email , password , username } = registerDto ; 
        const userFound = await this.userRepositiry.findOne ({where : {email}}) 
        if (userFound) 
            throw new BadRequestException("user already found") ; 
        const salt = await bcrypt.genSalt(10) ; 
        const hashPassword = await bcrypt.hash(password , salt) ; 

        let newUser = this.userRepositiry.create({email , username , password : hashPassword}) ; 
        newUser = await this.userRepositiry.save(newUser) ;   
        const payload  : JWTPayloadType= {id : newUser.id , userType : newUser.userType } ; 
        const acessToken = await this.jwtService.signAsync(payload) ; 
        return {acessToken} ; 
    }



    public async login (loginDto: LoginDto)  : Promise<AcessTokenType> {
        const {email , password}  = loginDto ; 
        const user = await this.userRepositiry.findOne ({where : {email}}) 
        if (!user) 
            throw new BadRequestException("user not found") ;

        const compare = await bcrypt.compare(password , user.password) ; 

        if (!compare) 
            throw new BadRequestException("password is not correct") ; 
        
        const payload  : JWTPayloadType= {id : user.id , userType : user.userType } ; 
        const acessToken = await this.jwtService.signAsync(payload) ; 

        return {acessToken} ; 
    }

    public async getCurrentUser (id : number)  : Promise<User>{
        const user = await this.userRepositiry.findOne({where : {id}}) ; 
        if (!user) 
            throw new BadRequestException ("user not found") ; 
        return user ; 
    }

    public  async getAllUsers() : Promise<User[]> {
        return await this.userRepositiry.find() ; 
    }

}