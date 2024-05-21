import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookComponent} from './book/book.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CodeComponent} from './code/code.component';
import {TableComponent} from './table/table.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {SpinnerComponent} from "./spinner/spinner.component";

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CodeComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatOption,
    MatAutocomplete,
    MatLabel,
    MatAutocompleteTrigger,
    MatInputModule,
    MatFormFieldModule,
    MatToolbar,
    SpinnerComponent
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
