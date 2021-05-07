import { Action, ActionCreator } from 'redux';
import { User } from '../models/user';

export const LOAD_ITEMS = '[User] Load items from server';
export interface LoadItemsAction extends Action {
  users: User[];
}

export const loadItems: ActionCreator<LoadItemsAction> = 
  (users) => ({
    type: LOAD_ITEMS,
    users: users
  });
