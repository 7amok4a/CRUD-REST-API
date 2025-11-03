import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, ParseIntPipe, Post, Put, Req, Res } from "@nestjs/common";
import { CreateProductDto} from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import type { Request , Response } from "express";

type ProductType = {id : number , title : string , price : number} ; 

@Controller("api/products")
export class ProductsController {

    private products : ProductType[] = [ {id : 1 , title : "rise" , price : 200}]; 

    @Post("express-way")
    public createNewProductExpressWay(@Req() req : Request , @Res({passthrough : true}) res : Response ,@Headers() header : any) {
        const body = req.body as { title: string; price: number };

        const newProduct: ProductType = {
            id: this.products.length + 1,
            title: body.title,
            price: body.price,
        };
        this.products.push(newProduct);
        res.cookie('authcook' , 'this is cook' , {httpOnly : true , maxAge : 120 })
        console.log(header) ; 
        console.log(req.headers) ; 
        return res.status(201).json(newProduct);
    }


    @Post()
    public createNewProduct(@Body() body : CreateProductDto) {
        const newProduct : ProductType = {
            id : this.products.length + 1 , 
            title : body.title , 
            price : body.price , 
        }
        this.products.push(newProduct) ; 
        console.log(body) ; 
        return this.products ; 
    }

    // ~api/products 
    @Get()
    public getAllProducts() {
        return this.products ; 
    }


    @Get(":id") 
    public getSingleProduct(@Param("id" ,ParseIntPipe) id : number) {
        const product = this.products.find(p => p.id === id) ;
        if (!product) 
                throw new NotFoundException("Product not found") ; 
        return product ; 
    }

    @Put(":id") 
    public updateProduct(@Param("id") id : string , @Body()body : UpdateProductDto) {
         const product = this.products.find(p => p.id === parseInt(id)) ;
        if (!product) 
                throw new NotFoundException("Product not found") ; 
        console.log(body) ; 
        return product ; 
    }


    @Delete(":id") 
    public DeleteProduct(@Param("id") id : string) {
         const product = this.products.find(p => p.id === parseInt(id)) ;
        if (!product) 
                throw new NotFoundException("Product not found") ; 
        return product ; 
    }
}