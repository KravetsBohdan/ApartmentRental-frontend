import {Injectable} from '@angular/core';
import {Booking} from "../interfaces";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  addBooking(booking: Booking, apartmentId: number): Observable<Booking> {
    const url = `${urls.bookings}/${apartmentId}`;
    return this.http.post<Booking>(url, booking).pipe(catchError(this.handleError));
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

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      const validationErrors = error.error;
      const errorMessage = Object.values(validationErrors).map(value => `${value}`).join('\n');
      return throwError(() => errorMessage);
    } else {
      const errorMessage = error.error?.message;
      return throwError(() => errorMessage);
    }
  }
}
