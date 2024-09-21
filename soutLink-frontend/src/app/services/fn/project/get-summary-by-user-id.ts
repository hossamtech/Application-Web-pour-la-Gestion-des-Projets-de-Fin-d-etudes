/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SummaryResponse } from '../../models/summary-response';

export interface GetSummaryByUserId$Params {
}

export function getSummaryByUserId(http: HttpClient, rootUrl: string, params?: GetSummaryByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<SummaryResponse>> {
  const rb = new RequestBuilder(rootUrl, getSummaryByUserId.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SummaryResponse>;
    })
  );
}

getSummaryByUserId.PATH = '/project/summary';
