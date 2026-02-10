import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { User } from "@prisma/client";

export const Authorized = createParamDecorator(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User[keyof User] | User => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();

    const user = request.user;

    if (!user) {
      throw new Error("User not found");
    }

    return data ? user[data] : user;
  },
);
