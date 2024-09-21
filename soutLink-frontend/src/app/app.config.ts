import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {icons, LUCIDE_ICONS, LucideIconProvider} from "lucide-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import {provideStore} from "@ngrx/store";
import {rootReducer} from "./store";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';
import { DatePipe } from '@angular/common';






export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    { provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(icons)
    },
    DatePipe,
    provideStore(rootReducer),
    provideAnimations(),
    provideToastr(),

  ]
};
