import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ChannelCreateDto } from "./dto/channel-create.dto";
import { UserGenerateDto } from "./dto/user-generate.dto";
import { VideoAddDto } from "./dto/video-add.dto";
import { Channel } from "./entities/channel.entity";
import { User } from "./entities/user.entity";
import { Video } from "./entities/video.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>
  ) {}

  public async addVideoToChannel(
    userId: number,
    channelId: number,
    videoAddDto: VideoAddDto
  ) {
    const existingUser = await this.userRepository.findOne({ id: userId });
    if (existingUser) {
      const existingChannel = await this.channelRepository.findOne({
        id: channelId
      });
      const newVideo = await this.videoRepository.create(videoAddDto);

      newVideo.channel = existingChannel;
      return this.videoRepository.save(newVideo);
    }
    throw new BadRequestException("Invalid user id provided...");
  }

  public async makeChannelForUser(
    userId: number,
    channelCreateDto: ChannelCreateDto
  ) {
    // TODO: Add checks and validations for users and channels
    const existingUser = await this.userRepository.findOne({ id: userId });
    const newChannel = await this.channelRepository.create(channelCreateDto);

    newChannel.user = existingUser;
    return this.channelRepository.save(newChannel);
  }

  public async makeNewUser(userGenerateDto: UserGenerateDto) {
    const newUser = await this.userRepository.create(userGenerateDto);
    return this.userRepository.save(newUser);
  }

  public async fetchAllUsers() {
    return this.userRepository.find();
  }
}
