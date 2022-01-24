import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupComponent } from './my-group.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';

import { RouterTestingModule } from '@angular/router/testing';

describe('MyGroupComponent', () => {
  let component: MyGroupComponent;
  let fixture: ComponentFixture<MyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGroupComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), RouterTestingModule],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call function groupInfos on init', () => {
    const spy = spyOn(component, 'groupInfos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call function disableRandom on init', () => {
    const spy = spyOn(component, 'disableRandom');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call function disableCreate on init', () => {
    const spy = spyOn(component, 'disableCreate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should return true when ask for group infos of current user logged', () => {
    expect(component.groupInfos(component.currentUser)).toBeTruthy();
  });
});
