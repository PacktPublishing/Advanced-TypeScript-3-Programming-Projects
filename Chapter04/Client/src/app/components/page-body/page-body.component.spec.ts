import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBodyComponent } from './page-body.component';

describe('PageBodyComponent', () => {
  let component: PageBodyComponent;
  let fixture: ComponentFixture<PageBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
