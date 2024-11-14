import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tier } from '../tier/tier.entity';
import { Character } from '../character/character.entity';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  visibility: number;

  @ManyToOne(() => Tier, { nullable: true })
  tier: Tier;

  @ManyToOne(() => Character, { nullable: false })
  npc: Character;

  @ManyToOne(() => Character, { nullable: false })
  pc: Character;
}
