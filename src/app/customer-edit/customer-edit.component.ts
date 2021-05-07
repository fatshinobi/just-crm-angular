import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as Redux from 'redux';

import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';
import { UserService } from '../user.service';
import { User } from '../models/user';

import { AppStore } from '../app.store';
import { AppState, getAllUsers } from '../app.reducer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {
  //@Input() customer: Customer;
  customer_id: string;
  customer: Customer;
  users: User[];

  constructor(
      private customerService: CustomerService, 
      private userService: UserService, 
      private route: ActivatedRoute, 
      private location: Location,
      @Inject(AppStore) private store: Redux.Store<AppState>
    ) { }

  ngOnInit(): void {
    this.store.subscribe( () => this.updateState() );
    this.updateState();

    this.customer_id = this.route.snapshot.paramMap.get('id');
    if (this.customer_id) {
      this.customerService.getCustomerFromAPI(this.customer_id).subscribe(
        response => {
          this.customer = response;
      })
    } else {
      this.customer = {id: '', name: ''}
    }

  }

  updateState() {
    const state = this.store.getState();
    this.users = getAllUsers(state);
  }

  save(customer) {
    //name = name.trim();
    //if (!name) { return; }

    if (this.customer_id) {
      this.customerService.updateCustomer({
        id: this.customer_id,
        name: this.customer.name
      });
    } else {
      this.customerService.addNew({name: this.customer.name} as Customer);
    }
    this.location.back();
  }
}
