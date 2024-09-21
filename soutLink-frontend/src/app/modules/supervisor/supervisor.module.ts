import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
  ]
})
export class SupervisorModule { }
