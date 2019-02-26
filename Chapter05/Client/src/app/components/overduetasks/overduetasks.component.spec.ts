import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverduetasksComponent } from './overduetasks.component';

describe('OverduetasksComponent', () => {
  let component: OverduetasksComponent;
  let fixture: ComponentFixture<OverduetasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverduetasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverduetasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
