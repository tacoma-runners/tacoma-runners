import { EventLocation } from './location.model';

export class RunEvent {
  id?: string;
  name?: string;
  description?: string;
  location?: EventLocation;
  stravaEventId?: string;
  stravaRouteId?: string;
  meetUpEventId?: string;
  facebookEventId?: string;
  eventDate?: string;
  runType?: string;
}
