import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {API_URL, HttpBaseUrlInterceptor} from "./core/HttpBaseUrlInterceptor";
import {environment} from "../environments/environment";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CockpitModule} from "./cockpit/cockpit.module";
import {SettingsModule} from "./settings/settings.module";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    CockpitModule,
    SettingsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: API_URL, useValue: environment.apiUrl},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseUrlInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
