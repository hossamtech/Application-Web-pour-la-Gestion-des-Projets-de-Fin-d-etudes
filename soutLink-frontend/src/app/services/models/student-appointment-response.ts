/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface StudentAppointmentResponse {
  appointmentDate?: string;
  appointmentTime?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  objet?: string;
  status?: 'WAITING' | 'PENDING' | 'ACCEPTED' | 'CANCELED';
  student?: StudentResponse;
}
