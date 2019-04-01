import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenchatComponent } from './openchat.component';

describe('OpenchatComponent', () => {
  let component: OpenchatComponent;
  let fixture: ComponentFixture<OpenchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
