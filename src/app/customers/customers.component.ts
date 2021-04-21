import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[];

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(
        response => { this.customers = response }
       );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
