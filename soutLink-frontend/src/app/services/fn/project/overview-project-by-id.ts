/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DetailedProjectResponse } from '../../models/detailed-project-response';

export interface OverviewProjectById$Params {
  'project-id': number;
}

export function overviewProjectById(http: HttpClient, rootUrl: string, params: OverviewProjectById$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedProjectResponse>> {
  const rb = new RequestBuilder(rootUrl, overviewProjectById.PATH, 'get');
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

overviewProjectById.PATH = '/project/overview-project/{project-id}';
