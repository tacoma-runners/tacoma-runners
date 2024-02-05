import { EventLocation } from './location.model';

export class RunEvent {
  id?: any;
  name?: string;
  description?: string;
  location?: EventLocation;
  stravaEventId?: string;
  stravaRouteId?: string;
  meetupEventId?: string;
  facebookEventId?: string;
  eventDate?: string;
  runType?: string;
}
