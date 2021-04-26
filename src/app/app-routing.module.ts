import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent, canActivate: [ LoggedInGuard ] },
  { path: 'customer_form/:id', component: CustomerEditComponent, canActivate: [ LoggedInGuard ] },
  { path: 'customer_form', component: CustomerEditComponent, canActivate: [ LoggedInGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
