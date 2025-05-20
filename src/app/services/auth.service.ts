import { inject, Injectable } from '@angular/core';
import { LoginResposnse } from '../data/LoginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../data/BaseResponse';
import { api } from '../environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../data/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  http = inject(HttpClient)
  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true)
    }

  }
  login(user: any): Promise<BaseResponse<LoginResposnse> | undefined> {
    const credentials = {
      'email': user.email,
      'password': user.password
    };
    return this.http.post<BaseResponse<LoginResposnse>>(api.LOGIN, credentials).pipe(map(data => data)).toPromise();
  }
  register(user: any): Promise<BaseResponse<LoginResposnse> | undefined> {
    const credentials = {
      'email': user.email,
      'name': user.name,
      'password': user.password
    };
    return this.http.post<BaseResponse<LoginResposnse>>(api.REGISTER, credentials).pipe(map(data => data)).toPromise();
  }
  setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user))
  }
  getRole() {
    let role = ""
    if (localStorage.getItem("user") != null)
      role = JSON.parse(localStorage.getItem("user")!).role

    return role
  }
  setToken(token: string) {
    localStorage.setItem("token", token)
  }
  getToken(): string | null {
    return localStorage.getItem("token")
  }
  logout() {
    localStorage.clear()
    this.isAuthenticatedSubject.next(false)
  }
}
