import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import * as Redux from 'redux';

import { User } from '../models/user';
import { AppStore } from '../app.store';
import { AppState } from '../app.reducer';
import * as UserActions from '../users/user.actions';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersUrl = 'http://localhost:3000/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient, @Inject(AppStore) private store: Redux.Store<AppState>) { }

  getUsers() {
    this.getUsersFromAPI().subscribe(
        response => { 
          this.store.dispatch(UserActions.loadItems(response)) 
        }
      )
  }

  getUsersFromAPI(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
