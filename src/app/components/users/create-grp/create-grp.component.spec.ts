import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrpComponent } from './create-grp.component';
import { DatabaseService } from 'src/app/services/database.service';
import { SharedService } from 'src/app/services/shared.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('CreateGrpComponent', () => {
  let component: CreateGrpComponent;
  let fixture: ComponentFixture<CreateGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGrpComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [DatabaseService, SharedService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
