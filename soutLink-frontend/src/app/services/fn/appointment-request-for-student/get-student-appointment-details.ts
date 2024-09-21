/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AppointmentDetailsResponse } from '../../models/appointment-details-response';

export interface GetStudentAppointmentDetails$Params {
  'request-id': number;
}

export function getStudentAppointmentDetails(http: HttpClient, rootUrl: string, params: GetStudentAppointmentDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<AppointmentDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, getStudentAppointmentDetails.PATH, 'get');
  if (params) {
    rb.path('request-id', params['request-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AppointmentDetailsResponse>;
    })
  );
}

getStudentAppointmentDetails.PATH = '/encadrant/studentAppointment-details/{request-id}';
