import { AuthGuard, RolesGuard } from "@common/guards";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ProductCategoryController } from "./product-category.controller";
import { ProductCategoryService } from "./product-category.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, AuthGuard, RolesGuard],
})
export class ProductCategoryModule {}
