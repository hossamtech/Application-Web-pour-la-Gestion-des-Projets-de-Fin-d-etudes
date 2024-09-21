/* tslint:disable */
/* eslint-disable */
import { StudentAppointmentResponse } from '../models/student-appointment-response';
export interface PageResponseStudentAppointmentResponse {
  content?: Array<StudentAppointmentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
