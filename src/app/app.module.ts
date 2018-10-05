import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(), UserModule],
  providers: []
})
export class AppModule {}
