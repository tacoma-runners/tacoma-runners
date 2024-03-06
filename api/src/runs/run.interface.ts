export interface Run {
  id: number;
  name: string;
  location: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    venueName: string;
    neighborhood: string;
  };
  stravaRouteId: string;
  stravaEventId: string;
  meetUpEventId: string;
  facebookEventId: string;
  eventDate: Date;
  runType: string;
  description: string;
  status: string;
}
