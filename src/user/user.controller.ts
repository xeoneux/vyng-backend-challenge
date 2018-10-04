import { Body, Controller, Param, Post } from "@nestjs/common";

import { ChannelCreateDto } from "./dto/channel-create.dto";
import { UserGenerateDto } from "./dto/user-generate.dto";
import { VideoAddDto } from "./dto/video-add.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async generateUser(@Body() userGenerateDto: UserGenerateDto) {
    return this.userService.makeNewUser(userGenerateDto);
  }

  @Post(":id/channels")
  public async createChannel(
    @Param("id") id: string,
    @Body() channelCreateDto: ChannelCreateDto
  ) {
    return this.userService.makeChannelForUser(+id, channelCreateDto);
  }

  @Post(":uid/channels/:cid/video")
  public async addVideo(
    @Param("uid") uid: string,
    @Param("cid") cid: string,
    @Body() videoAddDto: VideoAddDto
  ) {
    return this.userService.addVideoToChannel(+uid, +cid, videoAddDto);
  }
}
