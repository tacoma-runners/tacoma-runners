import { EventLocation } from './location.model';

export class RunEvent {
  id?: string;
  name?: string;
  description?: string;
  location?: EventLocation | string;
  stravaEventId?: string;
  stravaRouteId?: string;
  meetUpEventId?: string;
  facebookEventId?: string;
  eventDate?: string;
  runType?: string;
  status?: RunEventStatus;
}

export enum RunEventStatus {
  Pending = 'pending',
  Published = 'published',
  Archived = 'archived'
}

export enum RunEventType {
  ThursdayRun = 'thursday-run',
  Saturday5K = 'saturday-5k',
  SpecialEvent = 'Special Event'
}
