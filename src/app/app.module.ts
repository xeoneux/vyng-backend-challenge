import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  imports: [TypeOrmModule.forRoot()],
  providers: []
})
export class AppModule {}
