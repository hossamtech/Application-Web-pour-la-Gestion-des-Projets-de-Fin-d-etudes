/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
export interface StudentRequestsResponse {
  date?: string;
  description?: string;
  id?: number;
  projectTitle?: string;
  status?: 'PENDING' | 'REJECTED' | 'ACCEPTED';
  students?: Array<StudentResponse>;
}
