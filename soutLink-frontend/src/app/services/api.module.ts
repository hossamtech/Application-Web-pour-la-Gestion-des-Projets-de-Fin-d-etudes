/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ProjectService } from './services/project.service';
import { RequestAnAppointmentService } from './services/request-an-appointment.service';
import { ProjectRequestHistoryService } from './services/project-request-history.service';
import { AppointmentRequestForStudentService } from './services/appointment-request-for-student.service';
import { AuthenticationService } from './services/authentication.service';
import { StudentRequestForProjectsService } from './services/student-request-for-projects.service';
import { ListProjectService } from './services/list-project.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ProjectService,
    RequestAnAppointmentService,
    ProjectRequestHistoryService,
    AppointmentRequestForStudentService,
    AuthenticationService,
    StudentRequestForProjectsService,
    ListProjectService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
