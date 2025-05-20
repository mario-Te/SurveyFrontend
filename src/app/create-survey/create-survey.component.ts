import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Category } from '../data/Category';
import { SurveysService } from '../services/surveys.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-survey2',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class addSurveyComponent implements OnInit {
  surveyForm!: FormGroup;
  categories: Category[] = [];
  constructor(private fb: FormBuilder, private surveyService: SurveysService, private router: Router, private auth: AuthService) {
    if (this.auth.getRole() == 'user') {
      this.router.navigate(["/surveys"])
    }
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }
  fetchCategories() {
    this.surveyService.getCategories().then((response) => {
      this.categories = response?.data!
    })
  }
  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const question = this.fb.group({
      text: ['', Validators.required],
      type: ['single', Validators.required],
      options: this.fb.array([]),
    });
    this.questions.push(question);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.group({ text: ['', Validators.required] }));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  onSubmit(): void {
    console.log(this.surveyForm.errors)
    console.log(this.surveyForm.value);
    // TODO: Send to backend via HttpClient
    this.surveyService.createSurvey(this.surveyForm.value).then((res) => {
      console.log(res.data)
    });

  }
}
