import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as Redux from 'redux';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { UserService } from '../services/user.service';
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
  customer: Customer = {} as Customer;
  users: User[];

  emptyCustomer = {id: '', name: '', about: '', phone: '', web: '', user_id: ''} as Customer;

  customerForm: FormGroup;

  constructor(
      private customerService: CustomerService, 
      private userService: UserService, 
      private route: ActivatedRoute, 
      private location: Location,
      private formBuilder: FormBuilder,
      @Inject(AppStore) private store: Redux.Store<AppState>
    ) { 
      this.initCustomerForm(this.emptyCustomer);
    }

  ngOnInit(): void {
    this.store.subscribe( () => this.updateState() );
    this.updateState();

    this.customer_id = this.route.snapshot.paramMap.get('id');
    if (this.customer_id) {
      this.customerService.getCustomerFromAPI(this.customer_id).subscribe(
        response => {
          this.customer = response;
          this.initCustomerForm(this.customer);
      })
    } else {
      this.customer = this.emptyCustomer;
    }

  }

  initCustomerForm(customer: Customer) {
    this.customerForm = new FormGroup({
      name: new FormControl(customer.name, [Validators.required, Validators.minLength(3)]),
      about: new FormControl(customer.about),
      phone: new FormControl(customer.phone),
      web: new FormControl(customer.web),
      user_id: new FormControl(customer.user_id)
    });
  }

  updateState() {
    const state = this.store.getState();
    this.users = getAllUsers(state);
  }

  onSubmit() {
    if (this.customer_id) {
      this.customerService.updateCustomer({
        id: this.customer_id,
        name: this.customerForm.value.name,
        about: this.customerForm.value.name,
        phone: this.customerForm.value.phone,
        web: this.customerForm.value.web,
        user_id: this.customerForm.value.user_id
      });
    } else {
      this.customerService.addNew({
        name: this.customerForm.value.name,
        about: this.customerForm.value.name,
        phone: this.customerForm.value.phone,
        web: this.customerForm.value.web,
        user_id: this.customerForm.value.user_id
      } as Customer);
    }
    this.location.back();
  }
}
