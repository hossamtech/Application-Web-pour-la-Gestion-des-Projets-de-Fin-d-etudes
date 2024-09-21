/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDetailedProjectResponse } from '../../models/page-response-detailed-project-response';

export interface FindListProjectByListId$Params {
  page?: number;
  size?: number;
  status?: 'NOT_TAKEN' | 'IN_PROGRESS' | 'ACCEPTED';
  'listProject-id': number;
}

export function findListProjectByListId(http: HttpClient, rootUrl: string, params: FindListProjectByListId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDetailedProjectResponse>> {
  const rb = new RequestBuilder(rootUrl, findListProjectByListId.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('status', params.status, {});
    rb.path('listProject-id', params['listProject-id'], {});
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

findListProjectByListId.PATH = '/etudiant/all-projects/{listProject-id}';
