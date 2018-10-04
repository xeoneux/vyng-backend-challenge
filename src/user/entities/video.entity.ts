import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Channel } from "./channel.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public url: string;

  @ManyToOne(_ => Channel, channel => channel.videos)
  public channel: Channel;
}
