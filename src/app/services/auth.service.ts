import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, observable, Observable, of, tap} from "rxjs";
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



  login(user: Auth): Observable<string> {
    return this.httpClient.post(this.loginUrl, user, { responseType: 'text' })
      .pipe(
        tap((response: string) => {
          this.setToken(response);
          this.isAuthenticatedSubject.next(true);
        })
      );
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
