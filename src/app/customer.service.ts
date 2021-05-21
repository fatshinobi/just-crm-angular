import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import * as Redux from 'redux';

import { Customer } from './models/customer';
import { AppStore } from './app.store';
import { AppState } from './app.reducer';
import * as CustomerActions from './customers/customer.actions';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private customersUrl = 'http://localhost:3000/api/v1/customers';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(
    private http: HttpClient,
    @Inject(AppStore) private store: Redux.Store<AppState>
  ) { }

  getCustomers() {
    this.getCustomersFromAPI().subscribe(
        response => {
          this.store.dispatch(CustomerActions.loadItems(response)) 
        }
      )
  }

  getCustomersFromAPI(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        tap(_ => console.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  }

  getCustomerFromAPI(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.customersUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`fetched customer ${id}`)),
        catchError(this.handleError<Customer>('getCustomer', {id: '', name: '' , web: '', phone: '', about: '', user_id: ''}))
      );
  }

  addNew(customer: Customer) {
    this.addNewToApi(customer).subscribe(
      response => { 
         console.log('add customer');
         console.log(response);
         this.store.dispatch(CustomerActions.addItem(response))
      }
    )
  }

  addNewToApi(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => console.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addNew'))
    );
  }

  updateCustomer(customer: Customer) {
    this.updateCustomerToApi(customer).subscribe(
      response => {
        console.log('update customer');
        console.log(response);
        this.store.dispatch(CustomerActions.refreshItem(response))
      }
    )
  }

  updateCustomerToApi(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.customersUrl}/${customer.id}`, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => console.log(`updated customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('updateCustomer'))
    );
  }

  deleteCustomer(customer: Customer) {
    this.deleteCustomerToApi(customer).subscribe(
      response => {
        console.log('update customer');
        console.log(response);
        this.store.dispatch(CustomerActions.deleteItem(customer))
      }
    )
  }

  deleteCustomerToApi(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.customersUrl}/${customer.id}`, this.httpOptions).pipe(
      tap((delCustomer: Customer) => console.log(`deleted customer w/ id=${delCustomer.id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}