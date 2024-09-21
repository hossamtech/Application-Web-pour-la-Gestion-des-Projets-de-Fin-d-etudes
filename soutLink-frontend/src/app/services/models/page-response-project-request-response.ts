/* tslint:disable */
/* eslint-disable */
import { ProjectRequestResponse } from '../models/project-request-response';
export interface PageResponseProjectRequestResponse {
  content?: Array<ProjectRequestResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
