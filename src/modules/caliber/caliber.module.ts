import { AuthGuard, RolesGuard } from "@common/guards";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { CaliberController } from "./caliber.controller";
import { CaliberService } from "./caliber.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [CaliberController],
  providers: [CaliberService, AuthGuard, RolesGuard],
})
export class CaliberModule {}
