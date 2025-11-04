import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductSevice } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";

@Module({
    imports : [TypeOrmModule.forFeature([Product])] , 
    controllers : [ProductsController] , 
    providers : [ProductSevice] , 
})
export class ProductsModule {

    // get 
}