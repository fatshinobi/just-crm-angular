import { Action } from 'redux';
import { createSelector } from 'reselect';

import { Customer } from '../models/customer';
import * as CustomerActions from './customer.actions';

export interface CustomersState {
  customers: Customer[];
}

const initialState: CustomersState = {
  customers: []
};

export const CustomersReducer = function(state: CustomersState = initialState, action: Action): CustomersState {
  switch (action.type) {
    case CustomerActions.LOAD_ITEMS: {
      const customers: Customer[] = (<CustomerActions.LoadItemsAction>action).customers;
      return {
        customers: customers
      };
    }

    case CustomerActions.ADD_ITEM: {
      const customer: Customer = (<CustomerActions.AddItemAction>action).customer;
      return {
        customers: [...state.customers, customer]
      };
    }

    case CustomerActions.REFRESH_ITEM: {
      const customer: Customer = (<CustomerActions.RefreshItemAction>action).customer;
      const newCustomers: Customer[] = state.customers.map( 
          cust => {
            if (cust.id === customer.id) {
              return customer;
            } else {
              return cust;
            }
          }
        );

      return {
        customers: newCustomers
      };
    }

    case CustomerActions.DELETE_ITEM: {
      const customer: Customer = (<CustomerActions.RefreshItemAction>action).customer;
      const newCustomers: Customer[] = []
      state.customers.forEach(
        cust => {
          if (cust.id !== customer.id) {
            newCustomers.push(cust);
          }
        }
      );
      return {
        customers: newCustomers
      };
    }
    
    default:
      return state;
  }
};

export const getCustomersState = (state): CustomersState => state.customers;

export const getAllCustomers = createSelector(
    getCustomersState,
    (state: CustomersState) => state.customers
  );