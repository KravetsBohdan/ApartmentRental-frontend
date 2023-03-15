export interface Apartment {
  id: number;
  title: string;
  description: string;
  city: string;
  location: string;
  pricePerDay: number;
  roomsNumber: number;
  photoUrl?: string;
}
