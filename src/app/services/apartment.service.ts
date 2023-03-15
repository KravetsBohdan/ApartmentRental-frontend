import { Injectable } from '@angular/core';
import {Apartment, Booking} from "../interfaces";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) { }

  getAllApartments(page: number, size: number, query: string, city: string, sortBy: string, sortDir: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('query', query);
    params = params.append('city', city);
    params = params.append('sortBy', sortBy);
    params = params.append('sortDir', sortDir);

    return this.http.get<any>(urls.apartments, {params: params});
  }

  getApartmentById(id: number): Observable<Apartment> {
    return this.http.get<Apartment>(`${urls.apartments}/${id}`);
  }

  addApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(urls.apartments, apartment);
  }

  updateApartment(id: number, apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(`${urls.apartments}/${id}`, apartment);
  }

  deleteApartment(id: number): Observable<void> {
    return this.http.delete<void>(`${urls.apartments}/${id}`);
  }

  getBookedDays(apartmentId: number): Observable<Date[]> {
    return this.http.get<Date[]>(`${urls.apartments}/${apartmentId}/booked-days`);
  }

  getBookingsByApartmentId(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${urls.apartments}/${id}/bookings`);
  }
}
