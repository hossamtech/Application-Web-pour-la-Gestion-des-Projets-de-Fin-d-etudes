/* tslint:disable */
/* eslint-disable */
import { DetailedProjectResponse } from '../models/detailed-project-response';
import { SupervisorProjectResponse } from '../models/supervisor-project-response';
export interface DetailedListResponse {
  createdDate?: string;
  id?: number;
  listProjects?: Array<DetailedProjectResponse>;
  supervisor?: SupervisorProjectResponse;
}
