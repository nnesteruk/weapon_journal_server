import { AuthGuard, RolesGuard } from "@common/guards";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ManufacturerController } from "./manufacturer.controller";
import { ManufacturerService } from "./manufacturer.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ManufacturerController],
  providers: [ManufacturerService, AuthGuard, RolesGuard],
})
export class ManufacturerModule {}
