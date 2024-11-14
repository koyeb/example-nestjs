import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Character } from '../character/character.entity';

@Entity()
export class Tier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  level: number;

  @Column({ type: 'text', nullable: true })
  bonus: string;

  @ManyToOne(() => Character, { nullable: true })
  npc: Character;
}
