/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentAppointmentResponse } from '../../models/student-appointment-response';

export interface FindWaitingAppointments$Params {
}

export function findWaitingAppointments(http: HttpClient, rootUrl: string, params?: FindWaitingAppointments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentAppointmentResponse>>> {
  const rb = new RequestBuilder(rootUrl, findWaitingAppointments.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentAppointmentResponse>>;
    })
  );
}

findWaitingAppointments.PATH = '/encadrant/getStudentAppointment-waiting';
