import { Review } from "src/reviews/reviews.entity";
import { User } from "src/users/users.entity";
import { CURRENT_TIMESTAMP } from "src/utils/constants";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name : 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id : number ; 

    @Column({type : 'varchar' , length : '25'})
    title : string ;
    
    @Column()
    description : string ; 

    @Column({type: 'float'})
    price : number ;
    
    
    @CreateDateColumn({type : 'timestamp' , default :() =>CURRENT_TIMESTAMP}) 
    createAt : Date ; 

    @UpdateDateColumn({type : 'timestamp' , default : ()=>CURRENT_TIMESTAMP , onUpdate : CURRENT_TIMESTAMP}) 
    updateAt : Date ; 

    @OneToMany(() => Review , (review)=>review.product) 
    reviews : Review [] ; 


    @ManyToOne(() => User , (user) => user.product) 
    user : User ; 



}