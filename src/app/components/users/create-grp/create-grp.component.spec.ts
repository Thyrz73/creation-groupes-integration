import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrpComponent } from './create-grp.component';

describe('CreateGrpComponent', () => {
  let component: CreateGrpComponent;
  let fixture: ComponentFixture<CreateGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGrpComponent ]
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
