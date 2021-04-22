import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import * as Redux from 'redux';

import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service'
import { AppStore } from '../app.store';
import { AppState, getAllCustomers } from '../app.reducer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router, private http: HttpClient, @Inject(AppStore) private store: Redux.Store<AppState>) { }

  ngOnInit(): void {
    //this.getCustomers();
    this.store.subscribe( () => this.updateState() );
    this.updateState();

  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  //getCustomers(): void {
    //this.customerService.getCustomers()
    //  .subscribe(
    //    response => { this.customers = response }
    //   );
  //}

  updateState() {
    const state = this.store.getState();
    this.customers = getAllCustomers(state);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
