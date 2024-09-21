import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid(): boolean {
    const token: string = this.token;
    if (!token) {
      return false;
    }
    try {
      const jwtHelper = new JwtHelperService();
      const isTokenExpired = jwtHelper.isTokenExpired(token);
      if (isTokenExpired) {
        localStorage.clear();
        return false;
      }
      return true;
    } catch (error) {
      localStorage.clear();
      return false;
    }
  }


  getUserRole() {
    const token: string = this.token;
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    const authorities = decodedToken?.authorities as string[];
    return authorities ? authorities[0] : null;
  }
}
