import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Channel } from "./channel.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public name: string;

  @OneToMany(_ => Channel, channel => channel.user)
  public channels: Channel[];
}
