/* tslint:disable */
/* eslint-disable */
import { FileResponse } from '../models/file-response';
export interface ProjectResponse {
  description?: string;
  files?: Array<FileResponse>;
  id?: number;
  numberStudents?: number;
  title?: string;
}
