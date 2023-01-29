import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogMapaComponent } from './dialog-mapa.component';

describe('DialogMapaComponent', () => {
  let component: DialogMapaComponent;
  let fixture: ComponentFixture<DialogMapaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
