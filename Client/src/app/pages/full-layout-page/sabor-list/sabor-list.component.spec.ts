import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaborListComponent } from './sabor-list.component';

describe('SaborListComponent', () => {
  let component: SaborListComponent;
  let fixture: ComponentFixture<SaborListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaborListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaborListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
