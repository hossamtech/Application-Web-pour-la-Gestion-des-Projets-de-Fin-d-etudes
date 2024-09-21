/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { DetailedListResponse } from '../models/detailed-list-response';
import { DetailedProjectResponse } from '../models/detailed-project-response';
import { findAllListsWithStatusPlaced } from '../fn/list-project/find-all-lists-with-status-placed';
import { FindAllListsWithStatusPlaced$Params } from '../fn/list-project/find-all-lists-with-status-placed';
import { findListProjectByListId } from '../fn/list-project/find-list-project-by-list-id';
import { FindListProjectByListId$Params } from '../fn/list-project/find-list-project-by-list-id';
import { overviewProjectFromStudentById } from '../fn/list-project/overview-project-from-student-by-id';
import { OverviewProjectFromStudentById$Params } from '../fn/list-project/overview-project-from-student-by-id';
import { PageResponseDetailedProjectResponse } from '../models/page-response-detailed-project-response';

@Injectable({ providedIn: 'root' })
export class ListProjectService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `overviewProjectFromStudentById()` */
  static readonly OverviewProjectFromStudentByIdPath = '/etudiant/overview-project/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `overviewProjectFromStudentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  overviewProjectFromStudentById$Response(params: OverviewProjectFromStudentById$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedProjectResponse>> {
    return overviewProjectFromStudentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `overviewProjectFromStudentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  overviewProjectFromStudentById(params: OverviewProjectFromStudentById$Params, context?: HttpContext): Observable<DetailedProjectResponse> {
    return this.overviewProjectFromStudentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DetailedProjectResponse>): DetailedProjectResponse => r.body)
    );
  }

  /** Path part for operation `findListProjectByListId()` */
  static readonly FindListProjectByListIdPath = '/etudiant/all-projects/{listProject-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findListProjectByListId()` instead.
   *
   * This method doesn't expect any request body.
   */
  findListProjectByListId$Response(params: FindListProjectByListId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDetailedProjectResponse>> {
    return findListProjectByListId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findListProjectByListId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findListProjectByListId(params: FindListProjectByListId$Params, context?: HttpContext): Observable<PageResponseDetailedProjectResponse> {
    return this.findListProjectByListId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDetailedProjectResponse>): PageResponseDetailedProjectResponse => r.body)
    );
  }

  /** Path part for operation `findAllListsWithStatusPlaced()` */
  static readonly FindAllListsWithStatusPlacedPath = '/etudiant/all-listProjects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllListsWithStatusPlaced()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllListsWithStatusPlaced$Response(params?: FindAllListsWithStatusPlaced$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DetailedListResponse>>> {
    return findAllListsWithStatusPlaced(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllListsWithStatusPlaced$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllListsWithStatusPlaced(params?: FindAllListsWithStatusPlaced$Params, context?: HttpContext): Observable<Array<DetailedListResponse>> {
    return this.findAllListsWithStatusPlaced$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DetailedListResponse>>): Array<DetailedListResponse> => r.body)
    );
  }

}
