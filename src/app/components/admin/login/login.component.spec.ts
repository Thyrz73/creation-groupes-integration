import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Router, RouterModule } from '@angular/router';
import {Location} from "@angular/common";

import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigGrpesComponent } from '../config-grpes/config-grpes.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;
  let location: Location;
  let router: Router;

  function updateForm(userName: String) {
    fixture.componentInstance.loginAdmin(userName);
  }
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule.withRoutes([{ path: 'login-admin', component: LoginComponent },
         { path: 'config', component: ConfigGrpesComponent }]),
              RouterTestingModule],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component.router, 'navigate');
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
  })

  it ('should return login error when login!=admin or empty', () => {
    expect(component.loginAdmin('')).toEqual('login error');
    expect(component.loginAdmin('admi')).toEqual('login error');
  })

  it('should display error on screen when login incorrect', () => {
    // TODO
  });

  // it('should route to overview if login successfully',fakeAsync( () => {
  //   // TODO
  //   // fixture.detectChanges();
  //   // const btn = fixture.debugElement.nativeElement.querySelector('btn');
  //   // btn.click();
  //   // fixture.detectChanges();

  //   router = TestBed.get(Router);
  //   location = TestBed.get(Location);

  //   spyOn(component.router, 'navigate');
  //   component.loginAdmin("admin");
  //   // fixture.detectChanges();
  //   tick();
  //   expect(component.router.navigate).toEqual(['/config']);
  // }));
  // it('should route to overview if login successfully',fakeAsync( () => {
  //   // TODO
  //   //component.loginAdmin("admin");
  //   updateForm("admin");
  //   fixture.detectChanges();

  //   expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    
  //   const navArgs = routerSpy.navigateByUrl.calls.first().args[0];

  //   expect(navArgs).toBe('/config', 'should nav to Home Page');
  // }));
});
