import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call function showUserWithoutGroup on init', () => {
    const spy = spyOn(component, 'showUserWithoutGroup');
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

  it('current username should not be empty', () => {
    component.ngOnInit();
    expect(component.currentUser).not.toMatch('');
  })
});
