import {Injectable, NotFoundException } from "@nestjs/common";
import type { Request , Response } from "express";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";

type ProductType = {id : number , title : string , price : number} ; 

@Injectable()
export class ProductSevice {
    private products : ProductType[] = [ {id : 1 , title : "rise" , price : 200}]; 

        /**
            create new Product 
         */
        public createProduct( {title , price} : CreateProductDto) {
            const newProduct : ProductType = {
                id : this.products.length + 1 , 
                title : title , 
                price : price , 
            }
            this.products.push(newProduct) ;  
            return this.products ; 
        }
    
        /**
            get all Products 
        */
        public getAllProducts() {
            return this.products ; 
        }
    
        /*
            get Single Product by id 
        */
        public getSingleProduct( id : number) {
            const product = this.products.find(p => p.id === id) ;
            if (!product) 
                    throw new NotFoundException("Product not found") ; 
            return product ; 
        }


        /*
            update Product
        */
        public updateProduct(id : number , body : UpdateProductDto) {
             const product = this.products.find(p => p.id === id) ;
            if (!product) 
                    throw new NotFoundException("Product not found") ; 
            console.log(body) ; 
            return product ; 
        }
    
    
        /**
           delete Product
        */
        public DeleteProduct(id : number) {
             const product = this.products.find(p => p.id === id) ;
            if (!product) 
                    throw new NotFoundException("Product not found") ; 
            return product ; 
        }
}