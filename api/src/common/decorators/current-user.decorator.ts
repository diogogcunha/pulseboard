import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// WHY THIS DECORATOR EXISTS: Controllers should never access req.user directly.
// Using req.user spreads knowledge of the request shape across controllers.
// @CurrentUser() abstracts that away and makes the contract explicit.
export interface CurrentUserPayload {
  id: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
