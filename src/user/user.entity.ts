import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public name: string;
}
