import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomGroupComponent } from './random-group.component';

describe('RandomGroupComponent', () => {
  let component: RandomGroupComponent;
  let fixture: ComponentFixture<RandomGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
