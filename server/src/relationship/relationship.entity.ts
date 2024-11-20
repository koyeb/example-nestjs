import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tier } from '../tier/tier.entity';
import { Character } from '../character/character.entity';
import { Visibility } from '../visibility/visibility.entity';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Visibility, { nullable: true })
  visibility: Visibility;

  @ManyToOne(() => Tier, { nullable: true })
  tier: Tier;

  @ManyToOne(() => Character, { nullable: false })
  npc: Character;

  @ManyToOne(() => Character, { nullable: false })
  pc: Character;
}
