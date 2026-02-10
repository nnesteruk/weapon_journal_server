import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ModelController } from "./model.controller";
import { ModelService } from "./model.service";
import { AuthGuard, RolesGuard } from "@common/guards";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ModelController],
  providers: [ModelService, AuthGuard, RolesGuard],
})
export class ModelModule {}
