import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGrpesComponent } from './config-grpes.component';
import { DatabaseService } from 'src/app/services/database.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


describe('ConfigGrpesComponent', () => {
  let component: ConfigGrpesComponent;
  let fixture: ComponentFixture<ConfigGrpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGrpesComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [ DatabaseService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGrpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.createConfig).toBeDefined();
  });
});
