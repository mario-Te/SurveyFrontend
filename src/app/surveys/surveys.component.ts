import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../services/surveys.service';
import { SurveyResponse } from '../data/SurveyResponse';
import { Router } from '@angular/router';
import { Category } from '../data/Category';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;
  Surveys: SurveyResponse[] = []
  constructor(private surveyService: SurveysService, private router: Router) { }
  ngOnInit(): void {

    this.getCategories();
    this.fetchSurveys();
  }
  getCategories() {
    this.surveyService.getCategories().then((response) => {
      this.categories = response?.data!
    })
  }
  fetchSurveys() {
    this.isLoading = true;
    this.surveyService.getAllSurveys({ category: this.selectedCategory }).then((res) => {
      this.Surveys = res?.data!;
      this.isLoading = false;
    });
  }
  viewDetails(survey: SurveyResponse) {
    this.router.navigate(['/survey', survey.title]);

  }
  setCategory(cat: string) {

    this.selectedCategory = cat
    this.fetchSurveys()
  }
}
