import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;

  function updateForm(userName: String) {
    // fixture.componentInstance.loginAdmin['username'].setValue(userName);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterModule.forRoot([])],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
  })

  it ('should return login error when login!=admin or empty', () => {
    expect(component.loginAdmin('')).toEqual('login error');
    expect(component.loginAdmin('admi')).toEqual('login error');
  })

  it('should display error on screen when login incorrect', () => {
    // TODO
  });

  it('should route to overview if login successfully'), () => {
    // TODO
  }
});
