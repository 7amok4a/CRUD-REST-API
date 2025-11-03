import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import { CreateProductDto} from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { ProductSevice } from "./products.service";

@Controller("api/products")
export class ProductsController {
 
    constructor( private readonly productService  : ProductSevice ) {}


    @Post()
    public createNewProduct(@Body() body : CreateProductDto) {
        return this.productService.createProduct(body) ; 
    }

    // ~api/products 
    @Get()
    public getAllProducts() {
        return this.productService.getAllProducts() ; 
    }


    @Get(":id") 
    public getSingleProduct(@Param("id" ,ParseIntPipe) id : number) {
        return this.productService.getSingleProduct(id) ;
    }

    @Put(":id") 
    public updateProduct(@Param("id" , ParseIntPipe) id : number , @Body()body : UpdateProductDto) {
      return this.productService.updateProduct(id , body) ;
    }


    @Delete(":id") 
    public DeleteProduct(@Param("id" , ParseIntPipe) id : number) {
        return this.productService.DeleteProduct(id) ; 
    }
}