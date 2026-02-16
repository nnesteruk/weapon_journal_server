import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { AuthGuard, RolesGuard } from "@common/guards";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [StatsController],
  providers: [StatsService, AuthGuard, RolesGuard],
})
export class StatsModule {}
