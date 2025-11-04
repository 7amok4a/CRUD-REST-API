import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min, MinLength } from "class-validator";

export class UpdateProductDto {
// ahmed matter coding 
    @IsString({message : "this is custom message"}) 
    @IsNotEmpty()
    @Length(5 , 25)
    @IsOptional()
    title ?: string ;


    @IsString() 
    @IsNotEmpty()
    @IsOptional()
    @MinLength(5)
    description ?: string ; 
   
   
    @IsNumber() 
    @IsNotEmpty()
    @Min(0)
    @Max(1000) 
    @IsOptional()
    price ?: number ; 
}
