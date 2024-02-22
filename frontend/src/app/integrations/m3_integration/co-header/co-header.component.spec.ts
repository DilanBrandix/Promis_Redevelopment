import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoHeaderComponent } from './co-header.component';

describe('CoHeaderComponent', () => {
  let component: CoHeaderComponent;
  let fixture: ComponentFixture<CoHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoHeaderComponent]
    });
    fixture = TestBed.createComponent(CoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
