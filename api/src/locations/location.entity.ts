import { Run } from '../runs/run.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  streetAddress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @Column()
  neighborhood: string;

  @Column()
  googlePlaceId: string;

  @OneToMany(() => Run, (run) => run.location) // note: we will create author property in the Photo class below
  runs: Run[];
}
