import { Reducer, combineReducers } from 'redux';
import { CustomersReducer, CustomersState } from './customers/customers.reducer';
export * from './customers/customers.reducer';

export interface AppState {
  customers: CustomersState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  customers: CustomersReducer
});

export default rootReducer;
