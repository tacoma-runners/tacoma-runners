export interface Run {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  runNumber: number;
  venueName: string;
  stravaRouteId: string;
  stravaEventId: string;
  meetUpEventId: string;
  facebookEventId: string;
  eventDate: Date;
  runType: string;
  neighborhood: string;
}
