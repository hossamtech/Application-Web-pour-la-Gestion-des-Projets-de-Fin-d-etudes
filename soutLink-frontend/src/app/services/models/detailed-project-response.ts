/* tslint:disable */
/* eslint-disable */
import { FileResponse } from '../models/file-response';
import { SupervisorResponse } from '../models/supervisor-response';
import { UserDetailsResponse } from '../models/user-details-response';
export interface DetailedProjectResponse {
  createdDate?: string;
  description?: string;
  files?: Array<FileResponse>;
  id?: number;
  numberStudents?: number;
  status?: 'NOT_TAKEN' | 'IN_PROGRESS' | 'ACCEPTED';
  students?: Array<UserDetailsResponse>;
  supervisor?: SupervisorResponse;
  title?: string;
}
