import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NPC {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  level: number;
}
