/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DetailedListResponse } from '../../models/detailed-list-response';

export interface FindAllListsWithStatusPlaced$Params {
}

export function findAllListsWithStatusPlaced(http: HttpClient, rootUrl: string, params?: FindAllListsWithStatusPlaced$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DetailedListResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllListsWithStatusPlaced.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DetailedListResponse>>;
    })
  );
}

findAllListsWithStatusPlaced.PATH = '/etudiant/all-listProjects';
