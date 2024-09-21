/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProjectResponse } from '../../models/project-response';

export interface FindBookById$Params {
  'project-id': number;
}

export function findBookById(http: HttpClient, rootUrl: string, params: FindBookById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectResponse>> {
  const rb = new RequestBuilder(rootUrl, findBookById.PATH, 'get');
  if (params) {
    rb.path('project-id', params['project-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProjectResponse>;
    })
  );
}

findBookById.PATH = '/project/{project-id}';
