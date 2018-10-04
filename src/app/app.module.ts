import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/user.module";

@Module({
  controllers: [],
  imports: [TypeOrmModule.forRoot(), UserModule],
  providers: []
})
export class AppModule {}
