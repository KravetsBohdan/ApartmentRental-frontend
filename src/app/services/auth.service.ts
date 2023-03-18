import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Auth, AuthResponse} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'token';
  private loginUrl = 'http://localhost:8080/api/users/login';
  private isAuthenticatedSubject: BehaviorSubject<boolean>;


  constructor(private httpClient: HttpClient) {
    const initialAuthState = !!this.getToken();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(initialAuthState);
  }



  login(user: Auth): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.loginUrl, user)
      .pipe(tap((response: AuthResponse) => {
        this.setToken(response.token);
        this.isAuthenticatedSubject.next(true);
      }));
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
