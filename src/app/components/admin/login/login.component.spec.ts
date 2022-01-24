import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';
import { ConfigGrpesComponent } from '../config-grpes/config-grpes.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<RouterTestingModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),RouterTestingModule],
      providers: [DatabaseService]
      // imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
      //           RouterTestingModule.withRoutes([{path: 'login-admin', component: LoginComponent},
      //                                         {path: 'config', component: ConfigGrpesComponent}])],
      // providers: [ {DatabaseService, provide: Router, useValue: routerSpy} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state'), () => {
    expect(component.loginAdmin).toBeDefined();
    expect(component.username).toBeUndefined();
  };

  it('should return login ok when login=admin', () => {
    expect(component.loginAdmin('admin')).toEqual('login ok');
  });

  it ('should return login error when login!=admin or empty', () => {
    expect(component.loginAdmin('')).toEqual('login error');
    expect(component.loginAdmin('admi')).toEqual('login error');
  });

  // it('should navigate to config page if login successfully', fakeAsync(() => {
  //   // const spy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
  //   component.loginAdmin('admin');
  //   fixture.detectChanges();
  //   // expect(spy).toHaveBeenCalled();
  //   // expect(spy).toHaveBeenCalledWith('/config');
  //   // expect(location.path()).toBe('/config');
  //   const expectedPath = '/config';
  //   const actualPath = routerSpy;
  //   expect(actualPath).toEqual(expectedPath);
  // }));
});
