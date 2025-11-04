import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CURRENT_USER_KEY } from "src/utils/constants";
import { JWTPayloadType } from "src/utils/types";


@Injectable() 
export class AuthGuard implements CanActivate{
    constructor (private readonly jwtService : JwtService,  private readonly config : ConfigService) {}
    async canActivate(context: ExecutionContext) {
        const req : Request = context.switchToHttp().getRequest() ; 
        const [ type , token ] = req.headers.authorization?.split(" ") ?? [] ;
        if (token && type == 'Bearer') {
            try {
                const payload  : JWTPayloadType= await this.jwtService.verifyAsync(token , {secret : this.config.get<string>("JWT_SECRET")})  ; 
                req[CURRENT_USER_KEY] = payload ; 
            }catch (err) {
                console.log(err) ; 
                throw new UnauthorizedException() ;   
            }
        } 
        else {
            throw new UnauthorizedException() ; 
        }
        return true ;  
    }
}