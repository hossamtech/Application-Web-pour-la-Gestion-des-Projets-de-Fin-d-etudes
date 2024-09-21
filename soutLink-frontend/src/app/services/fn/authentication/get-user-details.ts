/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDetailsResponse } from '../../models/user-details-response';

export interface GetUserDetails$Params {
}

export function getUserDetails(http: HttpClient, rootUrl: string, params?: GetUserDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, getUserDetails.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDetailsResponse>;
    })
  );
}

getUserDetails.PATH = '/auth/userDetails';
