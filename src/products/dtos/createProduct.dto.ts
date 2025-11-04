import { IsNotEmpty, IsNumber, IsString, Length, Max, Min, MinLength } from "class-validator";

export class CreateProductDto {
// ahmed matter coding 
    @IsString({message : "this is custom message"}) 
    @IsNotEmpty()
    @Length(5 , 25)
    title : string ;


    @IsString() 
    @IsNotEmpty()
    @MinLength(5)
    description : string ; 

    @IsNumber() 
    @IsNotEmpty()
    @Min(0)
    @Max(1000) 
    price : number ; 
}