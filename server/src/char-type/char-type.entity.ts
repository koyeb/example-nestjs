import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CharType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  desc: string;
}
