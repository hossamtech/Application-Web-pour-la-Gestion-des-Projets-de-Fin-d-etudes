/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DetailedProjectResponse } from '../../models/detailed-project-response';

export interface OverviewProjectFromStudentById$Params {
  'project-id': number;
}

export function overviewProjectFromStudentById(http: HttpClient, rootUrl: string, params: OverviewProjectFromStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedProjectResponse>> {
  const rb = new RequestBuilder(rootUrl, overviewProjectFromStudentById.PATH, 'get');
  if (params) {
    rb.path('project-id', params['project-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DetailedProjectResponse>;
    })
  );
}

overviewProjectFromStudentById.PATH = '/etudiant/overview-project/{project-id}';
