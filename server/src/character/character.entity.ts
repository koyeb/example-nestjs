import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { World } from '../world/world.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => World, { nullable: true })
  world: World;

  @Column({ nullable: true })
  type: string;

  @ManyToOne(() => User, { nullable: true })
  owner: User;

  @Column({ length: 250, default: 'New Character' })
  name: string;

  @Column({ length: 250, nullable: true })
  nickname: string;

  @Column({ length: 500, nullable: true })
  class: string;

  @Column({ length: 500, nullable: true })
  subclass: string;

  @Column({ length: 500, nullable: true })
  secondClass: string;

  @Column({ length: 500, nullable: true })
  secondSubclass: string;

  @Column({ length: 500, nullable: true })
  species: string;

  @Column({ length: 250, nullable: true })
  customSpecies: string;

  @Column({ length: 250, nullable: true })
  subSpecies: string;

  @Column({ length: 500, nullable: true })
  gender: string;

  @Column({ length: 100, nullable: true })
  customGender: string;

  @Column({ length: 500, nullable: true })
  hair: string;

  @Column({ length: 500, nullable: true })
  eyes: string;

  @Column({ length: 250, nullable: true })
  height: string;

  @Column({ length: 5000, nullable: true })
  appearance: string;

  @Column({ type: 'int', default: 1 })
  visibility: number;
}
