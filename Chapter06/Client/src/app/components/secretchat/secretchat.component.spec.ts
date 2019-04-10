import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretchatComponent } from './secretchat.component';

describe('SecretchatComponent', () => {
  let component: SecretchatComponent;
  let fixture: ComponentFixture<SecretchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
