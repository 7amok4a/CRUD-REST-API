import { createParamDecorator , ExecutionContext } from "@nestjs/common";
import { CURRENT_USER_KEY } from "src/utils/constants";
import { JWTPayloadType } from "src/utils/types";



export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JWTPayloadType | undefined => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req[CURRENT_USER_KEY] as JWTPayloadType ;
    return user;
  })