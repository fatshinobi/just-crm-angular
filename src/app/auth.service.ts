import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Injectable()
export class AuthService {
  constructor(private tokenService: AngularTokenService) {}

  login(user: string, password: string): any {
    return this.tokenService.signIn({
      login: user,
      password: password
    })
  }

  setUser(user: string): void {
    localStorage.setItem('username', user);
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logOut(): void {
    localStorage.removeItem('username');
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];