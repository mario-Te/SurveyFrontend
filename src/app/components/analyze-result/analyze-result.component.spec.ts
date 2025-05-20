import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeResultComponent } from './analyze-result.component';

describe('AnalyzeResultComponent', () => {
  let component: AnalyzeResultComponent;
  let fixture: ComponentFixture<AnalyzeResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyzeResultComponent]
    });
    fixture = TestBed.createComponent(AnalyzeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
