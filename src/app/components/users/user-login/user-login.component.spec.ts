import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';
import {SharedService} from 'src/app/services/shared.service';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterModule.forRoot([])],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('check that username entered is saved as current username', () => {
    component.username = 'test';
    component.loginuser();
    fixture.detectChanges();
    console.log("UERBAME = ",component.sharedService.currentUsername);
    expect(component.sharedService.currentUsername).not.toMatch('');
  });*/
});
