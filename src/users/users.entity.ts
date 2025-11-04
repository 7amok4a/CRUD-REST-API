import { Product } from "src/products/products.entity";
import { Review } from "src/reviews/reviews.entity";
import { CURRENT_TIMESTAMP } from "src/utils/constants";
import { UserType } from "src/utils/enums";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity({name : "users"}) 
export class User {
    @PrimaryGeneratedColumn() 
    id : number ; 

    @Column({type : 'varchar' , length : '150' , nullable : true })
    username : string ; 

    @Column({type : 'varchar' , length : '250' , unique : true})
    email : string ; 


    @Column({type : 'varchar' })
    password : string ; 

    @Column({type : 'enum' , enum : UserType , default : UserType.NORMAL_USER})
    userType : UserType ; 

    @Column({type : 'boolean' , default : false})
    isAccountVerified : boolean ;  

    @CreateDateColumn({type : 'timestamp' , default :() =>CURRENT_TIMESTAMP}) 
    createAt : Date ; 
    
    @UpdateDateColumn({type : 'timestamp' , default : ()=>CURRENT_TIMESTAMP , onUpdate : CURRENT_TIMESTAMP}) 
    updateAt : Date ; 
 
    @OneToMany(() => Product , (product) => product.user)
    product : Product[] ; 


    @OneToMany(() => Review , (review) => review.user) 
    reviews : Review[] ; 
}