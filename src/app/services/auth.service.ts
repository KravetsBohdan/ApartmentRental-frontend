import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Auth, AuthResponse} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'token';
  private isAuthenticatedSubject: BehaviorSubject<boolean>;


  constructor(private httpClient: HttpClient) {
    const initialAuthState = !!this.getToken();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(initialAuthState);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      const validationErrors = error.error;
      const errorMessage = Object.values(validationErrors).map(value => `${value}`).join('\n');
      return throwError(() => errorMessage);
    } else {
      const errorMessage = 'You entered wrong email or password';
      return throwError(() => errorMessage);
    }
  }

  login(user: Auth): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${urls.users}/login`, user)
      .pipe(tap((response: AuthResponse) => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      }), catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem(this.token);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.token, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.token)
  }





}
