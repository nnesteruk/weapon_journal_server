import { AuthGuard, RolesGuard } from "@common/guards";
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { getJwtConfig } from "@config/jwt.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, AuthGuard, RolesGuard],
})
export class ProductModule {}
