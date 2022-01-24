import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosComponent } from './infos.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('InfosComponent', () => {
  let component: InfosComponent;
  let fixture: ComponentFixture<InfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
