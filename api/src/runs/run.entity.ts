import { Location } from '../locations/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum runType {
  saturday5k = 'saturday-5k',
  thursdayRun = 'thursday-run',
  specialRun = 'special-run',
}

export enum runStatus {
  pending = 'pending',
  published = 'published',
  archived = 'archived',
}

@Entity({ name: 'runs' })
export class Run {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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
  runType: runType;

  @Column()
  description: string;

  @ManyToOne(() => Location, (location) => location.runs)
  location: Location;

  @Column()
  status: runStatus;
}
