import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ChannelCreateDto } from "./dto/channel-create.dto";
import { UserGenerateDto } from "./dto/user-generate.dto";
import { Channel } from "./entities/channel.entity";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>
  ) {}

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
}
