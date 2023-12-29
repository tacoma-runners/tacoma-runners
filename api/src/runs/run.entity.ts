import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'runs' })
export class Run {
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
  runNumber: number;

  @Column()
  venueName: string;

  @Column()
  stravaRouteId: string;

  @Column()
  stravaEventId: string;

  @Column()
  meetUpEventId: string;

  @Column()
  facebookEventId: string;

  @Column()
  eventDate: Date;

  @Column()
  runType: string;

  @Column()
  neighborhood: string;
}
