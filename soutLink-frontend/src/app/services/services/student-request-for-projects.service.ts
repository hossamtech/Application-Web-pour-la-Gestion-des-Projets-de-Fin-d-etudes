/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveProjectRequest } from '../fn/student-request-for-projects/approve-project-request';
import { ApproveProjectRequest$Params } from '../fn/student-request-for-projects/approve-project-request';
import { getAllStudentRequests } from '../fn/student-request-for-projects/get-all-student-requests';
import { GetAllStudentRequests$Params } from '../fn/student-request-for-projects/get-all-student-requests';
import { getStudentRequestsById } from '../fn/student-request-for-projects/get-student-requests-by-id';
import { GetStudentRequestsById$Params } from '../fn/student-request-for-projects/get-student-requests-by-id';
import { rejectedProjectRequest } from '../fn/student-request-for-projects/rejected-project-request';
import { RejectedProjectRequest$Params } from '../fn/student-request-for-projects/rejected-project-request';
import { StudentRequestsResponse } from '../models/student-requests-response';

@Injectable({ providedIn: 'root' })
export class StudentRequestForProjectsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rejectedProjectRequest()` */
  static readonly RejectedProjectRequestPath = '/encadrant/project-request/rejected/{request-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejectedProjectRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectedProjectRequest$Response(params: RejectedProjectRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return rejectedProjectRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejectedProjectRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejectedProjectRequest(params: RejectedProjectRequest$Params, context?: HttpContext): Observable<{
}> {
    return this.rejectedProjectRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `approveProjectRequest()` */
  static readonly ApproveProjectRequestPath = '/encadrant/project-request/approve/{request-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveProjectRequest()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveProjectRequest$Response(params: ApproveProjectRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return approveProjectRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveProjectRequest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveProjectRequest(params: ApproveProjectRequest$Params, context?: HttpContext): Observable<{
}> {
    return this.approveProjectRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getAllStudentRequests()` */
  static readonly GetAllStudentRequestsPath = '/encadrant/student-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStudentRequests()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStudentRequests$Response(params?: GetAllStudentRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentRequestsResponse>>> {
    return getAllStudentRequests(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStudentRequests$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStudentRequests(params?: GetAllStudentRequests$Params, context?: HttpContext): Observable<Array<StudentRequestsResponse>> {
    return this.getAllStudentRequests$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentRequestsResponse>>): Array<StudentRequestsResponse> => r.body)
    );
  }

  /** Path part for operation `getStudentRequestsById()` */
  static readonly GetStudentRequestsByIdPath = '/encadrant/student-request/{request-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentRequestsById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentRequestsById$Response(params: GetStudentRequestsById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentRequestsResponse>> {
    return getStudentRequestsById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentRequestsById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentRequestsById(params: GetStudentRequestsById$Params, context?: HttpContext): Observable<StudentRequestsResponse> {
    return this.getStudentRequestsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentRequestsResponse>): StudentRequestsResponse => r.body)
    );
  }

}
