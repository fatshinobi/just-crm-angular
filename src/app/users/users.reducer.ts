import { Action } from 'redux';
import { createSelector } from 'reselect';

import { User } from '../models/user';
import * as UserActions from './user.actions';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: []
};

export const UsersReducer = function(state: UsersState = initialState, action: Action): UsersState {
  switch (action.type) {
    case UserActions.LOAD_ITEMS: {
      const users: User[] = (<UserActions.LoadItemsAction>action).users;
      return {
        users: users
      };
    }

    default:
      return state;
  }
};

export const getUsersState = (state): UsersState => state.users;

export const getAllUsers = createSelector(
    getUsersState,
    (state: UsersState) => state.users
  );