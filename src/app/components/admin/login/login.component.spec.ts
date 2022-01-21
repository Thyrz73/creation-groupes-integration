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

  it ('should return login error when login incorrect', () => {
    
  })

  it('should display error on screen when login incorrect', () => {
    // const div: HTMLElement = fixture.nativeElement.querySelector('div');
    // const display = div.style.display;
    // expect(display).toBe('inline');
  });
  
  it('display Username Error Msg when Username is blank', () => {
//     updateForm("");
//     fixture.detectChanges();
// ​
//     const button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();
//     fixture.detectChanges();
// ​
//     const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
//     expect(usernameErrorMsg).toBeDefined();
//     expect(usernameErrorMsg.innerHTML).toContain('Please enter username');
  });

  it('should route to overview if login successfully'), () => {
//     updateForm(validUser.username);
//     fixture.detectChanges();
//     const button = fixture.debugElement.nativeElement.querySelector('button');
//     button.click();
//     advance(fixture);
// ​
//     loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
//     advance(fixture);
// ​
//     expect(routerSpy.navigateByUrl).toHaveBeenCalled();
//     const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
//     // expecting to navigate to id of the component's first hero
//     expect(navArgs).toBe('/home', 'should nav to Home Page');    
  }
});
