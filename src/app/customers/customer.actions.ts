import { Action, ActionCreator } from 'redux';
import { Customer } from '../models/customer';

export const LOAD_ITEMS = '[Customer] Load items from server';
export interface LoadItemsAction extends Action {
  customers: Customer[];
}

export const loadItems: ActionCreator<LoadItemsAction> = 
  (customers) => ({
    type: LOAD_ITEMS,
    customers: customers
  });