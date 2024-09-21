/* tslint:disable */
/* eslint-disable */
export interface RegistrationRequest {
  apogeeCode?: number;
  department?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  sector?: string;
  typeForm: 'ADMIN' | 'ENCADRANT' | 'ETUDIANT';
}
