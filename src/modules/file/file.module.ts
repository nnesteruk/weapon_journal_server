import { AuthGuard } from "@common/guards";
import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService, AuthGuard],
  exports: [FileService],
})
export class FileModule {}
