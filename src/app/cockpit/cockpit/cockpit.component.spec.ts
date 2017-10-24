import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitComponentComponent } from './cockpit-component.component';

describe('CockpitComponentComponent', () => {
  let component: CockpitComponentComponent;
  let fixture: ComponentFixture<CockpitComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
