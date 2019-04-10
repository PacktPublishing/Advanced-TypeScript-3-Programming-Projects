import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingcontainerComponent } from './mappingcontainer.component';

describe('MappingcontainerComponent', () => {
  let component: MappingcontainerComponent;
  let fixture: ComponentFixture<MappingcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
