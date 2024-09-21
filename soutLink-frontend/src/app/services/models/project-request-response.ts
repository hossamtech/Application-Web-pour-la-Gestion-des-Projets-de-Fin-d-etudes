/* tslint:disable */
/* eslint-disable */
import { StudentResponse } from '../models/student-response';
import { SupervisorProjectResponse } from '../models/supervisor-project-response';
export interface ProjectRequestResponse {
  date?: string;
  description?: string;
  id?: number;
  numberStudents?: number;
  projectTitle?: string;
  status?: 'PENDING' | 'REJECTED' | 'ACCEPTED';
  students?: Array<StudentResponse>;
  supervisor?: SupervisorProjectResponse;
}
