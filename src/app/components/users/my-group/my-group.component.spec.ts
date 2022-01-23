import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupComponent } from './my-group.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { DatabaseService } from 'src/app/services/database.service';


describe('MyGroupComponent', () => {
  let component: MyGroupComponent;
  let fixture: ComponentFixture<MyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGroupComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
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
  })
});
