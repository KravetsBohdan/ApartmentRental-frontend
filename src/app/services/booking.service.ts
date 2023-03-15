import { Injectable } from '@angular/core';
import {Booking} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = 'http://localhost:8080/api/bookings';
  constructor(private http: HttpClient) { }
  addBooking(booking: Booking, apartmentId: number): Observable<Booking> {
    const url = `${this.API_URL}/${apartmentId}`;
    return this.http.post<Booking>(url, booking);
  }

  deleteBooking(id: number): Observable<void> {
   return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  rejectBooking(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/reject`, null);
  }

  approveBooking(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/confirm`, null);

  }
}
