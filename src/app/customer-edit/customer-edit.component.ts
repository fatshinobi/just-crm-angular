import { Component, OnInit, Input } from '@angular/core';

import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  //@Input() customer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    //this.customer = {id: '', name: ''};
  }

  save(name) {
    name = name.trim();
    if (!name) { return; }

    this.customerService.addNew({name: name} as Customer);
  }
}
