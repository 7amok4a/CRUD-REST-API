import {Injectable, NotFoundException } from "@nestjs/common";
import type { Request , Response } from "express";
import { CreateProductDto } from "./dtos/createProduct.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProductSevice {
    constructor ( @InjectRepository(Product) private readonly productRepositiry : Repository<Product>) {}

    /**
        create new Product 
        */
    public async createProduct( dto : CreateProductDto) {
        const newProduct = this.productRepositiry.create(dto) ; 
        return await this.productRepositiry.save(newProduct) ; 
    }
    
    /**
        get all Products 
    */
    public async getAllProducts() {
        return await this.productRepositiry.find() ; 
    }

    /*
        get Single Product by id 
    */
    public async getSingleProduct( id : number) {
        const product =  await this.productRepositiry.findOne({where : {id}}) ; 
        if (!product) 
            throw new NotFoundException() ; 
        return product ; 
    }


    /*
        update Product
    */
    public async updateProduct(id : number , updateProductDto : UpdateProductDto) {
       const product =  await this.productRepositiry.findOne({where : {id}}) ; 
        if (!product) 
            throw new NotFoundException() ; 

        product.title = updateProductDto.title ?? product.title; 
        product.description = updateProductDto.description ?? product.description; 
        product.price = updateProductDto.price ?? product.price; 

        return await this.productRepositiry.save(product) ; 

    }


    /**
         delete Product
    */
    public async DeleteProduct(id : number) {
        const product =  await this.productRepositiry.findOne({where : {id}}) ; 
        if (!product) 
            throw new NotFoundException() ; 

        await this.productRepositiry.remove(product) ;
        return {message : "product deleted successfully"}  ; 
    }
}