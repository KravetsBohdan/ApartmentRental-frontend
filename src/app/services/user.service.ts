import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Apartment, Booking, User} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {}


  getCurrentUser(): Observable<User> {

   return  this.httpClient.get<User>(`${this.url}/me`)
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/register`, user);
  }

  getUserApartments(): Observable<Apartment[]> {
    return this.httpClient.get<Apartment[]>(`${this.url}/me/apartments`)
  }

  getUserBookings(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(`${this.url}/me/bookings`)
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/me`, user);
  }

}
