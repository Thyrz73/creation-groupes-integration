import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseService } from 'src/app/services/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [RouterTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [DatabaseService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
