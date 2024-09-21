import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";
import {Role} from "../../enums/roles.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'userData';

  constructor(
      private tokenService: TokenService,
  ) {
  }

  setData(data: { [key: string]: any }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): { [key: string]: any } | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  getValue(key: string): any {
    const data = this.getData();
    return data ? data[key] : null;
  }

  setValue(key: string, value: any): void {
    const data = this.getData() || {};
    data[key] = value;
    this.setData(data);
  }

  isAdminLoggedIn(): boolean {
    const role: null | string = this.tokenService.getUserRole();
    if (role === null) {
      return false;
    }
    return role == Role.ADMIN;
  }

  isSupervisorLoggedIn(): boolean {
    const role: null | string = this.tokenService.getUserRole();
    if (role === null) {
      return false;
    }
    return role == Role.ENCADRANT;
  }

  isStudentLoggedIn(): boolean {
    const role: null | string = this.tokenService.getUserRole();
    if (role === null) {
      return false;
    }
    return role == Role.ETUDIANT;
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}