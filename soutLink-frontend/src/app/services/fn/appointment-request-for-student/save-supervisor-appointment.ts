/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SupervisorAppointmentRequest } from '../../models/supervisor-appointment-request';

export interface SaveSupervisorAppointment$Params {
  'request-id': number;
      body: SupervisorAppointmentRequest
}

export function saveSupervisorAppointment(http: HttpClient, rootUrl: string, params: SaveSupervisorAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, saveSupervisorAppointment.PATH, 'post');
  if (params) {
    rb.path('request-id', params['request-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

saveSupervisorAppointment.PATH = '/encadrant/save-supervisor-appointment/{request-id}';
