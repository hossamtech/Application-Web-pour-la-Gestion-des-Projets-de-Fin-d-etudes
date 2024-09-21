/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentRequestsResponse } from '../../models/student-requests-response';

export interface GetAllStudentRequests$Params {
}

export function getAllStudentRequests(http: HttpClient, rootUrl: string, params?: GetAllStudentRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentRequestsResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllStudentRequests.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentRequestsResponse>>;
    })
  );
}

getAllStudentRequests.PATH = '/encadrant/student-requests';
