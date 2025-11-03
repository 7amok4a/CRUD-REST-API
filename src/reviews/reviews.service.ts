import { Injectable } from "@nestjs/common"

@Injectable()
export class ReviewsService { 


    public getAllReviews() {
        return [
            {id : 1 , des : "name of haaaa"} 
        ] ; 
    }
}