import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TextSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;
}
