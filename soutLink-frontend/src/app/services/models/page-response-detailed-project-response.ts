/* tslint:disable */
/* eslint-disable */
import { DetailedProjectResponse } from '../models/detailed-project-response';
export interface PageResponseDetailedProjectResponse {
  content?: Array<DetailedProjectResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
