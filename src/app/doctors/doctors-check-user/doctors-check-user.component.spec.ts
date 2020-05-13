import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCheckUserComponent } from './doctors-check-user.component';

describe('DoctorsCheckUserComponent', () => {
  let component: DoctorsCheckUserComponent;
  let fixture: ComponentFixture<DoctorsCheckUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsCheckUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsCheckUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
