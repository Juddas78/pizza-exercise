import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AuthResponse, PizzaOrderService } from '../services/pizza-order.service';

import { LoginScreenComponent } from './login-screen.component';

describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let  mockPizzaService: PizzaOrderService;
  let formBuilder: FormBuilder;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginScreenComponent ],
      imports: [HttpClientTestingModule],
      providers: [{FormBuilder, useValue: formBuilder} ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    mockPizzaService = TestBed.inject(PizzaOrderService);
    formBuilder = new FormBuilder();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call loginSuccess on 200 response', ()=> {
      const mockResponse: AuthResponse = {
        access_token: 'valid'
      };
      const loginSuccessSpy = spyOn(component, 'loginSuccess');
      spyOn(mockPizzaService, 'authorize').and.returnValue(of(mockResponse));    
      component.loginInfo = formBuilder.group({
        username: "user",
        password: "password"
      });
      component.onSubmit();
      expect(loginSuccessSpy).toHaveBeenCalledOnceWith(mockResponse);
    });

    it('should call loginFailure on error response', ()=> {
      const mockResponse: HttpErrorResponse = {
        name: 'HttpErrorResponse',
        message: 'generic error response',
        error: undefined,
        ok: false,
        headers: new HttpHeaders,
        status: 500,
        statusText: '',
        url: null,
        type: HttpEventType.ResponseHeader
      };
      const loginFailureSpy = spyOn(component, 'loginFailure');
      spyOn(mockPizzaService, 'authorize').and.returnValue(throwError(() => mockResponse));    
      component.loginInfo = formBuilder.group({
        username: "user",
        password: "password"
      });
      component.onSubmit();
      expect(loginFailureSpy).toHaveBeenCalledOnceWith();
    });
  });

  describe('loginSuccess', () => {
    it('should set loginError to false', () => {

    });
    it('should set the auth token in the http service', () => { 

    });
    it('should emit true for logged in', () => {

    });
  })
});
