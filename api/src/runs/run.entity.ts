import { Location } from 'src/locations/location.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'runs' })
export class Run {
  @PrimaryGeneratedColumn()
  id: number;

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
  runType: string;

  @Column()
  description: string;

  @ManyToOne(() => Location, (location) => location.runs)
  location: Location;
}
