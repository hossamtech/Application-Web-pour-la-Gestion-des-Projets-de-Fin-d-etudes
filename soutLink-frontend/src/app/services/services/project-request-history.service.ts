/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { checkAcceptedProject } from '../fn/project-request-history/check-accepted-project';
import { CheckAcceptedProject$Params } from '../fn/project-request-history/check-accepted-project';
import { getAllProjectRequests } from '../fn/project-request-history/get-all-project-requests';
import { GetAllProjectRequests$Params } from '../fn/project-request-history/get-all-project-requests';
import { getParticipants } from '../fn/project-request-history/get-participants';
import { GetParticipants$Params } from '../fn/project-request-history/get-participants';
import { PageResponseProjectRequestResponse } from '../models/page-response-project-request-response';
import { ParticipantsResponse } from '../models/participants-response';
import { projectRequestById } from '../fn/project-request-history/project-request-by-id';
import { ProjectRequestById$Params } from '../fn/project-request-history/project-request-by-id';
import { requestProjectByPartners } from '../fn/project-request-history/request-project-by-partners';
import { RequestProjectByPartners$Params } from '../fn/project-request-history/request-project-by-partners';

@Injectable({ providedIn: 'root' })
export class ProjectRequestHistoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `projectRequestById()` */
  static readonly ProjectRequestByIdPath = '/etudiant/projectRequest/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `projectRequestById()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectRequestById$Response(params: ProjectRequestById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return projectRequestById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `projectRequestById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  projectRequestById(params: ProjectRequestById$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.projectRequestById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `requestProjectByPartners()` */
  static readonly RequestProjectByPartnersPath = '/etudiant/projectRequest/{project-id}/{serial-track}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestProjectByPartners()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestProjectByPartners$Response(params: RequestProjectByPartners$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return requestProjectByPartners(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestProjectByPartners$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestProjectByPartners(params: RequestProjectByPartners$Params, context?: HttpContext): Observable<{
}> {
    return this.requestProjectByPartners$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getParticipants()` */
  static readonly GetParticipantsPath = '/etudiant/requestParticipants/{serial-track}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getParticipants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getParticipants$Response(params: GetParticipants$Params, context?: HttpContext): Observable<StrictHttpResponse<ParticipantsResponse>> {
    return getParticipants(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getParticipants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getParticipants(params: GetParticipants$Params, context?: HttpContext): Observable<ParticipantsResponse> {
    return this.getParticipants$Response(params, context).pipe(
      map((r: StrictHttpResponse<ParticipantsResponse>): ParticipantsResponse => r.body)
    );
  }

  /** Path part for operation `getAllProjectRequests()` */
  static readonly GetAllProjectRequestsPath = '/etudiant/project-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProjectRequests()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProjectRequests$Response(params?: GetAllProjectRequests$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProjectRequestResponse>> {
    return getAllProjectRequests(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProjectRequests$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProjectRequests(params?: GetAllProjectRequests$Params, context?: HttpContext): Observable<PageResponseProjectRequestResponse> {
    return this.getAllProjectRequests$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProjectRequestResponse>): PageResponseProjectRequestResponse => r.body)
    );
  }

  /** Path part for operation `checkAcceptedProject()` */
  static readonly CheckAcceptedProjectPath = '/etudiant/checkAcceptedProject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkAcceptedProject()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkAcceptedProject$Response(params?: CheckAcceptedProject$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return checkAcceptedProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkAcceptedProject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkAcceptedProject(params?: CheckAcceptedProject$Params, context?: HttpContext): Observable<boolean> {
    return this.checkAcceptedProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
