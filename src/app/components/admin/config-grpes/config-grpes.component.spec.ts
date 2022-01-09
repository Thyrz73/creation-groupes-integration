import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGrpesComponent } from './config-grpes.component';

describe('ConfigGrpesComponent', () => {
  let component: ConfigGrpesComponent;
  let fixture: ComponentFixture<ConfigGrpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGrpesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGrpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
