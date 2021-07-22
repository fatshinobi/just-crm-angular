import { inject, fakeAsync, tick, TestBed } from "@angular/core/testing";

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

import { CustomerService } from './customer.service';
import { AppStore } from '../app.store';
import { Customer } from '../models/customer';

describe('CustomerService', () => {
  const storeMock = jasmine.createSpyObj('AppStore', ['dispatch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService, { provide: AppStore, useValue: storeMock }]
    });
  });

  function expectURL(backend: HttpTestingController, url: string) {
    const testRequest = backend.expectOne(url);
    testRequest.flush({ name: 'David' });
    return testRequest;
  }

  describe('getCustomersFromAPI', () => {
    it('gets right url', inject(
      [CustomerService, HttpTestingController, AppStore],
      fakeAsync((csv, backend, store_stub) => {
        let res;
        csv.getCustomersFromAPI().subscribe(_res => {
          console.log("_res: ", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/customers');
        tick();

        expect(res.name).toBe('David');
        
        expect(req.request.method).toBe('GET');
        backend.verify();
      })
    ));
  });

  describe('getCustomerFromAPI', () => {
    it('gets right url', inject(
      [CustomerService, HttpTestingController, AppStore],
      fakeAsync((csv, backend, store_stub) => {
        let res;
        csv.getCustomerFromAPI("123").subscribe(_res => {
          console.log("_res: ", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/customers/123');
        tick();

        expect(res.name).toBe('David');
        expect(req.request.method).toBe('GET');

        backend.verify();
      })
    ));
  });

  describe('addNewToApi', () => {
    it('gets right url', inject(
      [CustomerService, HttpTestingController, AppStore],
      fakeAsync((csv, backend, store_stub) => {
        let res;
        csv.addNewToApi({ id: '123', name: 'test' } as Customer).subscribe(_res => {
          console.log("_res: ", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/customers');
        tick();

        expect(res.name).toBe('David');
        expect(req.request.method).toBe('POST');
        backend.verify();
      })
    ));
  });


  describe('updateCustomerToApi', () => {
    it('gets right url', inject(
      [CustomerService, HttpTestingController, AppStore],
      fakeAsync((csv, backend, store_stub) => {
        let res;
        csv.updateCustomerToApi({ id: '123', name: 'test' } as Customer).subscribe(_res => {
          console.log("_res: ", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/customers/123');
        tick();

        expect(res.name).toBe('David');
        expect(req.request.method).toBe('PATCH');
        backend.verify();
      })
    ));
  });

  describe('deleteCustomerToApi', () => {
    it('gets right url', inject(
      [CustomerService, HttpTestingController, AppStore],
      fakeAsync((csv, backend, store_stub) => {
        let res;
        csv.deleteCustomerToApi({ id: '123', name: 'test' } as Customer).subscribe(_res => {
          console.log("_res: ", _res);
          res = _res;
        });
        let req = expectURL(backend, 'http://localhost:3000/api/v1/customers/123');
        tick();

        expect(res.name).toBe('David');
        expect(req.request.method).toBe('DELETE');
        backend.verify();
      })
    ));
  });

})