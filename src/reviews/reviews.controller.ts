import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";

@Controller("api/reviews")
export class ReviewsController {
    constructor (private readonly reviewsService : ReviewsService) {}
    @Get() 
    public getAllReviews() {
       return this.reviewsService.getAllReviews();  
    }
}