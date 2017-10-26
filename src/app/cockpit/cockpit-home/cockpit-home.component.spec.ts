import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitHomeComponent } from './cockpit-home.component';

describe('CockpitHomeComponent', () => {
  let component: CockpitHomeComponent;
  let fixture: ComponentFixture<CockpitHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
