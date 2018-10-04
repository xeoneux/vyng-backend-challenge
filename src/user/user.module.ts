import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Channel } from "./entities/channel.entity";
import { User } from "./entities/user.entity";
import { Video } from "./entities/video.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, Channel, Video])],
  providers: [UserService]
})
export class UserModule {}
