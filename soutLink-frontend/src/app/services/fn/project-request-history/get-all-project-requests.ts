/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProjectRequestResponse } from '../../models/page-response-project-request-response';

export interface GetAllProjectRequests$Params {
  page?: number;
  size?: number;
}

export function getAllProjectRequests(http: HttpClient, rootUrl: string, params?: GetAllProjectRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectRequestResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllProjectRequests.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseProjectRequestResponse>;
    })
  );
}

getAllProjectRequests.PATH = '/etudiant/project-requests';
