import { Product } from "src/products/products.entity";
import { User } from "src/users/users.entity";
import { CURRENT_TIMESTAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity,ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name : "reviews"}) 
export class Review {

    @PrimaryGeneratedColumn() 
    id : number ; 


    @Column({type : 'int'})
    rating : number ; 

    @Column({type :'varchar'}) 
    comment : string ; 

    @CreateDateColumn({type : 'timestamp' , default :() =>CURRENT_TIMESTAMP}) 
        createAt : Date ; 
    
    @UpdateDateColumn({type : 'timestamp' , default : ()=>CURRENT_TIMESTAMP , onUpdate : CURRENT_TIMESTAMP}) 
    updateAt : Date ; 

    @ManyToOne(() => Product , (product)=> product.reviews)
    product : Product ;


    @ManyToOne(() => User , (user)=> user.reviews)
    user : User ; 
}