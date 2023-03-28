import {Injectable} from '@angular/core';
import {Apartment, Booking} from "../interfaces";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  constructor(private http: HttpClient) {
  }

  getAllApartments(query: string, city: string, page: number, size: number, sortBy: string, sortDir: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('query', query);
    params = params.append('city', city);
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sortBy', sortBy);
    params = params.append('sortDir', sortDir);

    return this.http.get<any>(urls.apartments, {params: params});
  }

  getApartmentById(id: number): Observable<Apartment> {
    return this.http.get<Apartment>(`${urls.apartments}/${id}`);
  }

  addApartment(apartment: Apartment): Observable<Apartment> {
    return this.http.post<Apartment>(urls.apartments, apartment).pipe(catchError(this.handleError));
  }

  updateApartment(id: number, apartment: Apartment): Observable<Apartment> {
    return this.http.put<Apartment>(`${urls.apartments}/${id}`, apartment).pipe(catchError(this.handleError));
  }

  deleteApartment(id: number): Observable<void> {
    return this.http.delete<void>(`${urls.apartments}/${id}`).pipe(catchError(this.handleError));
  }

  getBookingsByApartmentId(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${urls.apartments}/${id}/bookings`);
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
