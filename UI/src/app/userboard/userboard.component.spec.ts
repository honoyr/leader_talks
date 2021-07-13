import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserboardComponent } from './userboard.component';

describe('UserboardComponent', () => {
  let component: UserboardComponent;
  let fixture: ComponentFixture<UserboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
