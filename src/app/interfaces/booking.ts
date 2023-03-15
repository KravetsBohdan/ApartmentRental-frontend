export interface Booking {
  id?: number;
  startDate: Date | null;
  endDate: Date | null;
  status?: string;
  totalPrice: number;
  city?: string;
  location?: string;
}
