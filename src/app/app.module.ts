import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../user/user.module";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      entities: [__dirname + "/../**/*.entity.ts"],
      synchronize: true,
      type: "postgres",
      url:
        process.env.DATABASE_URL || "postgres://root:root@localhost:5432/test"
    }),
    UserModule
  ],
  providers: []
})
export class AppModule {}
