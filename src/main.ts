import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

@Module({
  controllers: [],
  imports: [],
  providers: []
})
class AppModule {}

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
})();
