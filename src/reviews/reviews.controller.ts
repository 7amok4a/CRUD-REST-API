import { Controller, Get } from "@nestjs/common";

@Controller("api/reviews")
export class ReviewsController {

    @Get() 
    public getAllReviews() {
        return [
            {id : 1 , des : "name of haaaa"} 
        ] ; 
    }
}