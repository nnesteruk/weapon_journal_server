import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers["authorization"];

      if (!authHeader) {
        throw new UnauthorizedException("Нет заголовка Authorization");
      }

      const [bearer, token]: string[] =
        request.headers.authorization.split(" ");

      if (!token || bearer !== "Bearer") {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован. Нет токена!",
        });
      }

      const user = this.jwtService.verify(token);
      request.user = user;

      return true;
    } catch (err) {
      throw new ForbiddenException({ message: err.message });
    }
  }
}
