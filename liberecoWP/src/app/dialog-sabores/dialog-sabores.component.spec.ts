import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogSaboresComponent } from './dialog-sabores.component';

describe('DialogSaboresComponent', () => {
  let component: DialogSaboresComponent;
  let fixture: ComponentFixture<DialogSaboresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaboresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
