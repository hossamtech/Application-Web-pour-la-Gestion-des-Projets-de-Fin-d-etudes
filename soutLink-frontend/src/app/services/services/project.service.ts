/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteFileById } from '../fn/project/delete-file-by-id';
import { DeleteFileById$Params } from '../fn/project/delete-file-by-id';
import { DetailedProjectResponse } from '../models/detailed-project-response';
import { findBookById } from '../fn/project/find-book-by-id';
import { FindBookById$Params } from '../fn/project/find-book-by-id';
import { findProjectBySupervisor } from '../fn/project/find-project-by-supervisor';
import { FindProjectBySupervisor$Params } from '../fn/project/find-project-by-supervisor';
import { getSummaryByUserId } from '../fn/project/get-summary-by-user-id';
import { GetSummaryByUserId$Params } from '../fn/project/get-summary-by-user-id';
import { overviewProjectById } from '../fn/project/overview-project-by-id';
import { OverviewProjectById$Params } from '../fn/project/overview-project-by-id';
import { PageResponseDetailedProjectResponse } from '../models/page-response-detailed-project-response';
import { placeListProjects } from '../fn/project/place-list-projects';
import { PlaceListProjects$Params } from '../fn/project/place-list-projects';
import { ProjectResponse } from '../models/project-response';
import { saveProject } from '../fn/project/save-project';
import { SaveProject$Params } from '../fn/project/save-project';
import { SummaryResponse } from '../models/summary-response';
import { uploadFilesProject } from '../fn/project/upload-files-project';
import { UploadFilesProject$Params } from '../fn/project/upload-files-project';

@Injectable({ providedIn: 'root' })
export class ProjectService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveProject()` */
  static readonly SaveProjectPath = '/project';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveProject()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProject$Response(params: SaveProject$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveProject$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveProject(params: SaveProject$Params, context?: HttpContext): Observable<number> {
    return this.saveProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadFilesProject()` */
  static readonly UploadFilesProjectPath = '/project/file/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFilesProject()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFilesProject$Response(params: UploadFilesProject$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadFilesProject(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFilesProject$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFilesProject(params: UploadFilesProject$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadFilesProject$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteFileById()` */
  static readonly DeleteFileByIdPath = '/project/file/delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFileById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteFileById$Response(params: DeleteFileById$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return deleteFileById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFileById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteFileById(params: DeleteFileById$Params, context?: HttpContext): Observable<{
}> {
    return this.deleteFileById$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `placeListProjects()` */
  static readonly PlaceListProjectsPath = '/project/list-project/place';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `placeListProjects()` instead.
   *
   * This method doesn't expect any request body.
   */
  placeListProjects$Response(params?: PlaceListProjects$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return placeListProjects(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `placeListProjects$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  placeListProjects(params?: PlaceListProjects$Params, context?: HttpContext): Observable<{
}> {
    return this.placeListProjects$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `findBookById()` */
  static readonly FindBookByIdPath = '/project/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBookById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookById$Response(params: FindBookById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProjectResponse>> {
    return findBookById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findBookById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBookById(params: FindBookById$Params, context?: HttpContext): Observable<ProjectResponse> {
    return this.findBookById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProjectResponse>): ProjectResponse => r.body)
    );
  }

  /** Path part for operation `getSummaryByUserId()` */
  static readonly GetSummaryByUserIdPath = '/project/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSummaryByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSummaryByUserId$Response(params?: GetSummaryByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<SummaryResponse>> {
    return getSummaryByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSummaryByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSummaryByUserId(params?: GetSummaryByUserId$Params, context?: HttpContext): Observable<SummaryResponse> {
    return this.getSummaryByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<SummaryResponse>): SummaryResponse => r.body)
    );
  }

  /** Path part for operation `overviewProjectById()` */
  static readonly OverviewProjectByIdPath = '/project/overview-project/{project-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `overviewProjectById()` instead.
   *
   * This method doesn't expect any request body.
   */
  overviewProjectById$Response(params: OverviewProjectById$Params, context?: HttpContext): Observable<StrictHttpResponse<DetailedProjectResponse>> {
    return overviewProjectById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `overviewProjectById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  overviewProjectById(params: OverviewProjectById$Params, context?: HttpContext): Observable<DetailedProjectResponse> {
    return this.overviewProjectById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DetailedProjectResponse>): DetailedProjectResponse => r.body)
    );
  }

  /** Path part for operation `findProjectBySupervisor()` */
  static readonly FindProjectBySupervisorPath = '/project/all-projects';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findProjectBySupervisor()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProjectBySupervisor$Response(params?: FindProjectBySupervisor$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDetailedProjectResponse>> {
    return findProjectBySupervisor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findProjectBySupervisor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findProjectBySupervisor(params?: FindProjectBySupervisor$Params, context?: HttpContext): Observable<PageResponseDetailedProjectResponse> {
    return this.findProjectBySupervisor$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDetailedProjectResponse>): PageResponseDetailedProjectResponse => r.body)
    );
  }

}
