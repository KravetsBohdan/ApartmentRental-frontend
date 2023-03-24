import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
    return this.httpClient.post<User>(`${urls.users}/register`, user);
  }

  getUserApartments(): Observable<Apartment[]> {
    return this.httpClient.get<Apartment[]>(`${urls.users}/me/apartments`)
  }

  getUserBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${urls.users}/me/bookings`)
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${urls.users}/me`, user);
  }

}
