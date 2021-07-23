import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileDropComponent } from './input-file-drop.component';

describe('InputFileDropComponent', () => {
  let component: InputFileDropComponent;
  let fixture: ComponentFixture<InputFileDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFileDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
