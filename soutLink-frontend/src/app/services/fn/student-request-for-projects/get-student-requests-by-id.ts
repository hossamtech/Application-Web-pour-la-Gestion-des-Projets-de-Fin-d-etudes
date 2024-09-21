/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentRequestsResponse } from '../../models/student-requests-response';

export interface GetStudentRequestsById$Params {
  'request-id': number;
}

export function getStudentRequestsById(http: HttpClient, rootUrl: string, params: GetStudentRequestsById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentRequestsResponse>> {
  const rb = new RequestBuilder(rootUrl, getStudentRequestsById.PATH, 'get');
  if (params) {
    rb.path('request-id', params['request-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentRequestsResponse>;
    })
  );
}

getStudentRequestsById.PATH = '/encadrant/student-request/{request-id}';
