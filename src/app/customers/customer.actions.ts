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

export const ADD_ITEM = '[Item] Add new item';
export interface AddItemAction extends Action {
  customer: Customer;
}

export const addItem: ActionCreator<AddItemAction> =
  (customer) => ({
    type: ADD_ITEM,
    customer: customer
  });

export const REFRESH_ITEM = '[Customer] Refresh item';
export interface RefreshItemAction extends Action {
  customer: Customer;
}

export const refreshItem: ActionCreator<RefreshItemAction> =
  (customer) => ({
    type: REFRESH_ITEM,
    customer: customer
  });

export const DELETE_ITEM = '[Customer] Delete item';
export interface DeleteItemAction extends Action {
  customer: Customer;
}

export const deleteItem: ActionCreator<DeleteItemAction> =
  (customer) => ({
    type: DELETE_ITEM,
    customer: customer
  });