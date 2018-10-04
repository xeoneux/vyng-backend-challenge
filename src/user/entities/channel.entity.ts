import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { User } from "./user.entity";
import { Video } from "./video.entity";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public name: string;

  @ManyToOne(_ => User, user => user.channels)
  public user: User;

  @OneToMany(_ => Video, video => video.channel)
  public videos: Video[];
}
