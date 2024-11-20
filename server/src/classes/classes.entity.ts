import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  desc: string;
}
