import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import {AngularFireModule} from '@angular/fire/compat'

import { environment } from 'src/environments/environment';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule]
    });
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when create new config',() => {
    expect(service.newConfig(10, 3, "LAST_MIN", Math.abs(10/3))).toBeTruthy();
  });

  it('should return true when create new config',() => {
    expect(service.putInRandomGroup('usernameTestRandom', '2')).toBeTruthy();
  });

  it('should return true when ask for getGroupName', () => {
    expect(service.getGroupName("sami")).toBeTruthy();
  });

  it('should return false when ask for getGroupName with non existant username', () => {
    expect(service.getGroupName("djlsjkb")).not.toBeTrue();
  });

  it('should return true when ask for getUsers with correct id group', () => {
    expect(service.getGroupName("1")).toBeTruthy();
  });

  it('should return false when ask for getUsers with non existant group', () => {
    expect(service.getGroupName("600000")).not.toBeTrue();
  });
});
