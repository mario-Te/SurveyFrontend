import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../services/surveys.service';
import { SurveyAnswer, Option } from '../data/SurveyResponse';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  surveyAnswers: SurveyAnswer[] = [];
  selectedSurvey!: SurveyAnswer;
  constructor(private surveyServey: SurveysService, private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.surveyServey.getMyAnswers().then((res) => {
      if (res?.success) {
        this.surveyAnswers = res?.data!;
      }
    })
  }

  getOptionText(options: Option[] | undefined, answerId: string): string {
    const option = options?.find(o => o._id === answerId);
    return option ? option.text : 'N/A';
  }
  setSelected(survey: SurveyAnswer) {
    this.selectedSurvey = survey
  }
}
