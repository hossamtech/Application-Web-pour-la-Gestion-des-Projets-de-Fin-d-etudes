/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RejectedProjectRequest$Params {
  'request-id': number;
}

export function rejectedProjectRequest(http: HttpClient, rootUrl: string, params: RejectedProjectRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, rejectedProjectRequest.PATH, 'patch');
  if (params) {
    rb.path('request-id', params['request-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

rejectedProjectRequest.PATH = '/encadrant/project-request/rejected/{request-id}';
