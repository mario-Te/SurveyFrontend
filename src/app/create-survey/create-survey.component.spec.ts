import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addSurveyComponent } from './create-survey.component';

describe('CreateSurveyComponent', () => {
  let component: addSurveyComponent;
  let fixture: ComponentFixture<addSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [addSurveyComponent]
    });
    fixture = TestBed.createComponent(addSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
