/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface UpcomingAppointmentsResponse {
  appointmentDate?: string;
  appointmentTime?: string;
  description?: string;
  id?: number;
  objet?: string;
  student?: Array<StudentResponse>;
}
