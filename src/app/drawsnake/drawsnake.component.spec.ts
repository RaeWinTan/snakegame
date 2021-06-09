import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawsnakeComponent } from './drawsnake.component';

describe('DrawsnakeComponent', () => {
  let component: DrawsnakeComponent;
  let fixture: ComponentFixture<DrawsnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawsnakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawsnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
