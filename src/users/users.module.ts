import { Module } from "@nestjs/common"
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Module({
    imports : [
        TypeOrmModule.forFeature([User]) , 
        JwtModule.registerAsync({
            inject : [ConfigService] , 
            useFactory: (config: ConfigService) => {
                return {
                    global: true,
                    secret: config.get<string>("JWT_SECRET") , 
                    signOptions : {expiresIn : config.get("JWT_EXPIRE_IN")} 
                };
            },
    })] , 
    controllers : [UserController]  , 
    providers : [UsersService] , 

})
export class UsersModule {
    
}