/* tslint:disable */
/* eslint-disable */
import { StudentAppointmentResponse } from '../models/student-appointment-response';
import { StudentResponse } from '../models/student-response';
export interface AppointmentDetailsResponse {
  projectTitle?: string;
  studentAppointment?: StudentAppointmentResponse;
  students?: Array<StudentResponse>;
}
