import { Reducer, combineReducers } from 'redux';
import { CustomersReducer, CustomersState } from './customers/customers.reducer';
export * from './customers/customers.reducer';

import { UsersReducer, UsersState } from './users/users.reducer';
export * from './users/users.reducer';

export interface AppState {
  customers: CustomersState;
  users: UsersState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  customers: CustomersReducer,
  users: UsersReducer
});

export default rootReducer;
