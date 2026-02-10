import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthGuard, RolesGuard } from "@common/guards";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard, RolesGuard],
})
export class UserModule {}
