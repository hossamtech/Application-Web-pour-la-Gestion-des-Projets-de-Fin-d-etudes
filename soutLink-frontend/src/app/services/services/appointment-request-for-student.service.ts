/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AppointmentDetailsResponse } from '../models/appointment-details-response';
import { findAcceptedAppointmentsByDate } from '../fn/appointment-request-for-student/find-accepted-appointments-by-date';
import { FindAcceptedAppointmentsByDate$Params } from '../fn/appointment-request-for-student/find-accepted-appointments-by-date';
import { findStudentAppointment } from '../fn/appointment-request-for-student/find-student-appointment';
import { FindStudentAppointment$Params } from '../fn/appointment-request-for-student/find-student-appointment';
import { findWaitingAppointments } from '../fn/appointment-request-for-student/find-waiting-appointments';
import { FindWaitingAppointments$Params } from '../fn/appointment-request-for-student/find-waiting-appointments';
import { getStudentAppointmentDetails } from '../fn/appointment-request-for-student/get-student-appointment-details';
import { GetStudentAppointmentDetails$Params } from '../fn/appointment-request-for-student/get-student-appointment-details';
import { PageResponseStudentAppointmentResponse } from '../models/page-response-student-appointment-response';
import { saveSupervisorAppointment } from '../fn/appointment-request-for-student/save-supervisor-appointment';
import { SaveSupervisorAppointment$Params } from '../fn/appointment-request-for-student/save-supervisor-appointment';
import { StudentAppointmentResponse } from '../models/student-appointment-response';
import { UpcomingAppointmentsResponse } from '../models/upcoming-appointments-response';

@Injectable({ providedIn: 'root' })
export class AppointmentRequestForStudentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveSupervisorAppointment()` */
  static readonly SaveSupervisorAppointmentPath = '/encadrant/save-supervisor-appointment/{request-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveSupervisorAppointment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSupervisorAppointment$Response(params: SaveSupervisorAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveSupervisorAppointment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveSupervisorAppointment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveSupervisorAppointment(params: SaveSupervisorAppointment$Params, context?: HttpContext): Observable<number> {
    return this.saveSupervisorAppointment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getStudentAppointmentDetails()` */
  static readonly GetStudentAppointmentDetailsPath = '/encadrant/studentAppointment-details/{request-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentAppointmentDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentAppointmentDetails$Response(params: GetStudentAppointmentDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<AppointmentDetailsResponse>> {
    return getStudentAppointmentDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentAppointmentDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentAppointmentDetails(params: GetStudentAppointmentDetails$Params, context?: HttpContext): Observable<AppointmentDetailsResponse> {
    return this.getStudentAppointmentDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<AppointmentDetailsResponse>): AppointmentDetailsResponse => r.body)
    );
  }

  /** Path part for operation `findStudentAppointment()` */
  static readonly FindStudentAppointmentPath = '/encadrant/getStudentAppointment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findStudentAppointment()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentAppointment$Response(params?: FindStudentAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStudentAppointmentResponse>> {
    return findStudentAppointment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findStudentAppointment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findStudentAppointment(params?: FindStudentAppointment$Params, context?: HttpContext): Observable<PageResponseStudentAppointmentResponse> {
    return this.findStudentAppointment$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseStudentAppointmentResponse>): PageResponseStudentAppointmentResponse => r.body)
    );
  }

  /** Path part for operation `findWaitingAppointments()` */
  static readonly FindWaitingAppointmentsPath = '/encadrant/getStudentAppointment-waiting';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWaitingAppointments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWaitingAppointments$Response(params?: FindWaitingAppointments$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentAppointmentResponse>>> {
    return findWaitingAppointments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findWaitingAppointments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWaitingAppointments(params?: FindWaitingAppointments$Params, context?: HttpContext): Observable<Array<StudentAppointmentResponse>> {
    return this.findWaitingAppointments$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentAppointmentResponse>>): Array<StudentAppointmentResponse> => r.body)
    );
  }

  /** Path part for operation `findAcceptedAppointmentsByDate()` */
  static readonly FindAcceptedAppointmentsByDatePath = '/encadrant/findAcceptedAppointmentsByDate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAcceptedAppointmentsByDate()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAcceptedAppointmentsByDate$Response(params: FindAcceptedAppointmentsByDate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UpcomingAppointmentsResponse>>> {
    return findAcceptedAppointmentsByDate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAcceptedAppointmentsByDate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAcceptedAppointmentsByDate(params: FindAcceptedAppointmentsByDate$Params, context?: HttpContext): Observable<Array<UpcomingAppointmentsResponse>> {
    return this.findAcceptedAppointmentsByDate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UpcomingAppointmentsResponse>>): Array<UpcomingAppointmentsResponse> => r.body)
    );
  }

}
