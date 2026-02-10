import { AuthGuard, RolesGuard } from "@common/guards";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ProductTypeController } from "./product-type.controller";
import { ProductTypeService } from "./product-type.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService, AuthGuard, RolesGuard],
})
export class ProductTypeModule {}
