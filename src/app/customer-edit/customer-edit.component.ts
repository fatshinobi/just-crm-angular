import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  //@Input() customer: Customer;
  customer_id: string;
  customer: Customer;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
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
