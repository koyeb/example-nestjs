import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { World } from '../world/world.entity';
import { CharType } from '../char-type/char-type.entity';
import { Classes } from '../classes/classes.entity';
import { Species } from '../species/species.entity';
import { Gender } from '../gender/gender.entity';
import { Visibility } from '../visibility/visibility.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => World, { nullable: true })
  world: World;

  @ManyToOne(() => CharType, { nullable: true })
  type: CharType;

  @ManyToOne(() => User, { nullable: true })
  owner: User;

  @Column({ length: 250, default: 'New Character' })
  name: string;

  @Column({ length: 250, nullable: true })
  nickname: string;

  @ManyToOne(() => Classes, { nullable: true })
  class: Classes;

  @Column({ length: 500, nullable: true })
  subclass: string;

  @ManyToOne(() => Classes, { nullable: true })
  secondClass: Classes;

  @Column({ length: 500, nullable: true })
  secondSubclass: string;

  @ManyToOne(() => Species, { nullable: true })
  species: Species;

  @Column({ length: 250, nullable: true })
  customSpecies: string;

  @Column({ length: 250, nullable: true })
  subSpecies: string;

  @ManyToOne(() => Gender, { nullable: true })
  gender: Gender;

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

  @ManyToOne(() => Visibility, { nullable: true })
  visibility: Visibility;
}
