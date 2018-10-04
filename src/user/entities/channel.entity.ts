import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public name: string;

  @ManyToOne(_ => User, user => user.channels)
  public user: User;
}
