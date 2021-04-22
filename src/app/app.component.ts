import { Component, Inject } from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from './app.store';
import { AppState } from './app.reducer';
import { CustomerService } from './customer.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(@Inject(AppStore) private store: Redux.Store<AppState>, private customerService: CustomerService) {
    this.customerService.getCustomers();
  }
}
