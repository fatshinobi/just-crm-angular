import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

import {
  HttpClient,
  HttpBackend,
  HttpRequest,
  HttpResponse,
  HttpHandler
} from "@angular/common/http";

import { UserService } from './user.service';
import { AppStore } from '../app.store';

describe('UserService', () => {
  let service: UserService;
  const storeMosk = jasmine.createSpyObj('AppStore', ['dispatch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, {provide: AppStore, useValue: storeMosk}]
    });
  });

  function expectURL(backend: HttpTestingController, url: string) {
    const testRequest = backend.expectOne(url);
    testRequest.flush({ name: 'John' });
    return testRequest;
  }


  describe('getUsersFromAPI', () => {
    it('gets right url', inject(
      [UserService, HttpTestingController, AppStore],
      fakeAsync((usv, backend, store_stub) => {
        let res;
        usv.getUsersFromAPI().subscribe(_res => {
          console.log("_res", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/users');
        tick();

        expect(res.name).toBe('John');
        expect(req.request.method).toBe('GET');
        backend.verify();
      })
    ));
  });

})
