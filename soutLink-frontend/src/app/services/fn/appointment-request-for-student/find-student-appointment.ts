/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseStudentAppointmentResponse } from '../../models/page-response-student-appointment-response';

export interface FindStudentAppointment$Params {
  page?: number;
  size?: number;
  status?: 'WAITING' | 'PENDING' | 'ACCEPTED' | 'CANCELED';
}

export function findStudentAppointment(http: HttpClient, rootUrl: string, params?: FindStudentAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStudentAppointmentResponse>> {
  const rb = new RequestBuilder(rootUrl, findStudentAppointment.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseStudentAppointmentResponse>;
    })
  );
}

findStudentAppointment.PATH = '/encadrant/getStudentAppointment';
