export class RunEvent {
  id?: any;
  name?: string;
  description?: string;
  location?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    name?: string;
    neighborhood?: string;
  }
  stravaEventId?: string;
  meetupEventId?: string;
  facebookEventId?: string;
  eventDate?: string;
  runType?: string;
}
