/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDetailedProjectResponse } from '../../models/page-response-detailed-project-response';

export interface FindProjectBySupervisor$Params {
  page?: number;
  size?: number;
  status?: 'NOT_TAKEN' | 'IN_PROGRESS' | 'ACCEPTED';
}

export function findProjectBySupervisor(http: HttpClient, rootUrl: string, params?: FindProjectBySupervisor$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDetailedProjectResponse>> {
  const rb = new RequestBuilder(rootUrl, findProjectBySupervisor.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDetailedProjectResponse>;
    })
  );
}

findProjectBySupervisor.PATH = '/project/all-projects';
