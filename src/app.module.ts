import {
  ApplicantModule,
  AuthModule,
  CaliberModule,
  CaseModule,
  ManufacturerModule,
  ModelModule,
  PrismaModule,
  ProductCategoryModule,
  ProductModule,
  ProductTypeModule,
  StatsModule,
  UserModule,
} from "@modules";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { FileModule } from "./modules/file";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "uploads"),
      serveRoot: `/api/static`,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    ApplicantModule,
    ProductTypeModule,
    ProductCategoryModule,
    CaliberModule,
    ManufacturerModule,
    ModelModule,
    ProductModule,
    CaseModule,
    FileModule,
    StatsModule,
  ],
})
export class AppModule {}
