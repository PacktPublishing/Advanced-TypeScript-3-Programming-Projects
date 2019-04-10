import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralchatComponent } from './generalchat.component';

describe('GeneralchatComponent', () => {
  let component: GeneralchatComponent;
  let fixture: ComponentFixture<GeneralchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
