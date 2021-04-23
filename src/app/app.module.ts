import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularTokenModule } from 'angular-token';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AUTH_PROVIDERS } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';

import { AppState, default as reducer } from './app.reducer';
import { AppStore, appStoreProviders } from './app.store';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoginComponent,
    CustomerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000/api/v1'
    })
  ],
  providers: [
    AUTH_PROVIDERS,
    LoggedInGuard,
    appStoreProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
