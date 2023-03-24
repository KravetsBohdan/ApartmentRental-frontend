import {Injectable} from '@angular/core';
import {Booking} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  addBooking(booking: Booking, apartmentId: number): Observable<Booking> {
    const url = `${urls.bookings}/${apartmentId}`;
    return this.http.post<Booking>(url, booking);
  }

  deleteBooking(id: number): Observable<void> {
   return this.http.delete<void>(`${urls.bookings}/${id}`);
  }

  rejectBooking(id: number): Observable<void> {
    return this.http.patch<void>(`${urls.bookings}/${id}/reject`, null);
  }

  approveBooking(id: number): Observable<void> {
    return this.http.patch<void>(`${urls.bookings}/${id}/confirm`, null);

  }
}
