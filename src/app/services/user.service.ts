import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Apartment, Booking, User} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}


  getCurrentUser(): Observable<User> {

   return  this.httpClient.get<User>(`${urls.users}/me`)
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${urls.users}/register`, user)
      .pipe(catchError(this.handleError));
  }

  getUserApartments(): Observable<Apartment[]> {
    return this.httpClient.get<Apartment[]>(`${urls.users}/me/apartments`)
  }

  getUserBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${urls.users}/me/bookings`)
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${urls.users}/me`, user)
      .pipe(catchError(this.handleError));
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
