import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAuthComponent } from './fire-auth.component';

describe('FireAuthComponent', () => {
  let component: FireAuthComponent;
  let fixture: ComponentFixture<FireAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
