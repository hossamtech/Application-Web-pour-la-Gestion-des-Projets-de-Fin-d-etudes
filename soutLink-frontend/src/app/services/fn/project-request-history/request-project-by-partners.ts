/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RequestProjectByPartners$Params {
  'project-id': number;
  'serial-track': string;
}

export function requestProjectByPartners(http: HttpClient, rootUrl: string, params: RequestProjectByPartners$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, requestProjectByPartners.PATH, 'post');
  if (params) {
    rb.path('project-id', params['project-id'], {});
    rb.path('serial-track', params['serial-track'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

requestProjectByPartners.PATH = '/etudiant/projectRequest/{project-id}/{serial-track}';
