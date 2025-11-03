import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductSevice } from "./products.service";

@Module({
    controllers : [ProductsController] , 
    providers : [ProductSevice] , 
})
export class ProductsModule {

    // get 
}