import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Review} from "../interfaces/review";
import {catchError, Observable, throwError} from 'rxjs';
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  addReview(review: Review, apartmentId: number): Observable<Review> {
    return this.http.post<Review>(`${urls.reviews}/apartments/${apartmentId}`, review)
      .pipe(catchError(this.handleError));
  }

  getReviewsByApartmentId(apartmentId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${urls.reviews}/apartments/${apartmentId}`);
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
