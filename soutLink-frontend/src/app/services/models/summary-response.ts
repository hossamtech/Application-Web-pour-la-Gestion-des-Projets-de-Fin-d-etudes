/* tslint:disable */
/* eslint-disable */
import { ProjectResponse } from '../models/project-response';
export interface SummaryResponse {
  id?: number;
  projectList?: Array<ProjectResponse>;
  status?: 'Pending' | 'Posted';
}
