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

  it('should return true when ask for configuration', () => {
    expect(service.getConfig()).toBeTruthy();
  });

  it('should return true when ask for list of users without group', () => {
    expect(service.getUsersWithoutGroup()).toBeTruthy();
  });

  it('should return true when ask for list of incomplete groups', () => {
    expect(service.getIncompleteGroups()).toBeTruthy();
  });

  it('should return false when put user in non existing group', () => {
    expect(service.putInRandomGroup("user","2344657689")).not.toBeTrue();
  });

  it('should return false when ask for group of non existing user', () => {
    expect(service.getGroupName(" ")).not.toBeTrue();
  });

  it('should return true whan ask for list of groups', () => {
    expect(service.getCreatedGroups()).not.toBeTrue();
  });

  it('should return false when user doesn\'t exist',() => {
    expect(service.inviteUser(" ", "~")).not.toBeTrue();
  })
});
