import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseButtonComponent } from './defense-button.component';

describe('DefenseButtonComponent', () => {
  let component: DefenseButtonComponent;
  let fixture: ComponentFixture<DefenseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefenseButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefenseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
