/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AppointmentRequestsResponse } from '../models/appointment-requests-response';
import { cancelAppointment } from '../fn/request-an-appointment/cancel-appointment';
import { CancelAppointment$Params } from '../fn/request-an-appointment/cancel-appointment';
import { confirmAppointment } from '../fn/request-an-appointment/confirm-appointment';
import { ConfirmAppointment$Params } from '../fn/request-an-appointment/confirm-appointment';
import { findRequestsByUser } from '../fn/request-an-appointment/find-requests-by-user';
import { FindRequestsByUser$Params } from '../fn/request-an-appointment/find-requests-by-user';
import { findSupervisorAppointment } from '../fn/request-an-appointment/find-supervisor-appointment';
import { FindSupervisorAppointment$Params } from '../fn/request-an-appointment/find-supervisor-appointment';
import { saveAppointmentRequest } from '../fn/request-an-appointment/save-appointment-request';
import { SaveAppointmentRequest$Params } from '../fn/request-an-appointment/save-appointment-request';
import { SupervisorAppointmentResponse } from '../models/supervisor-appointment-response';

@Injectable({ providedIn: 'root' })
export class RequestAnAppointmentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveAppointmentRequest()` */
  static readonly SaveAppointmentRequestPath = '/etudiant/save-appointmentRequest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAppointmentRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAppointmentRequest$Response(params: SaveAppointmentRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveAppointmentRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAppointmentRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAppointmentRequest(params: SaveAppointmentRequest$Params, context?: HttpContext): Observable<number> {
    return this.saveAppointmentRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `confirmAppointment()` */
  static readonly ConfirmAppointmentPath = '/etudiant/confirm-appointment/{appointment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirmAppointment()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirmAppointment$Response(params: ConfirmAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return confirmAppointment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirmAppointment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirmAppointment(params: ConfirmAppointment$Params, context?: HttpContext): Observable<{
}> {
    return this.confirmAppointment$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `cancelAppointment()` */
  static readonly CancelAppointmentPath = '/etudiant/cancel-appointment/{appointment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelAppointment()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelAppointment$Response(params: CancelAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return cancelAppointment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelAppointment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelAppointment(params: CancelAppointment$Params, context?: HttpContext): Observable<{
}> {
    return this.cancelAppointment$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findSupervisorAppointment()` */
  static readonly FindSupervisorAppointmentPath = '/etudiant/findSupervisorAppointment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findSupervisorAppointment()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSupervisorAppointment$Response(params?: FindSupervisorAppointment$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SupervisorAppointmentResponse>>> {
    return findSupervisorAppointment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findSupervisorAppointment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findSupervisorAppointment(params?: FindSupervisorAppointment$Params, context?: HttpContext): Observable<Array<SupervisorAppointmentResponse>> {
    return this.findSupervisorAppointment$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SupervisorAppointmentResponse>>): Array<SupervisorAppointmentResponse> => r.body)
    );
  }

  /** Path part for operation `findRequestsByUser()` */
  static readonly FindRequestsByUserPath = '/etudiant/findRequestsByUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findRequestsByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRequestsByUser$Response(params?: FindRequestsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AppointmentRequestsResponse>>> {
    return findRequestsByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findRequestsByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findRequestsByUser(params?: FindRequestsByUser$Params, context?: HttpContext): Observable<Array<AppointmentRequestsResponse>> {
    return this.findRequestsByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AppointmentRequestsResponse>>): Array<AppointmentRequestsResponse> => r.body)
    );
  }

}
