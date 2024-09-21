/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ParticipantsResponse } from '../../models/participants-response';

export interface GetParticipants$Params {
  'serial-track': string;
}

export function getParticipants(http: HttpClient, rootUrl: string, params: GetParticipants$Params, context?: HttpContext): Observable<StrictHttpResponse<ParticipantsResponse>> {
  const rb = new RequestBuilder(rootUrl, getParticipants.PATH, 'get');
  if (params) {
    rb.path('serial-track', params['serial-track'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ParticipantsResponse>;
    })
  );
}

getParticipants.PATH = '/etudiant/requestParticipants/{serial-track}';
