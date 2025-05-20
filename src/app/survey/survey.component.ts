import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../data/Questions';
import { SurveysService } from '../services/surveys.service';
import { StatsBarComponent } from '../components/stats-bar/stats-bar.component';
import { SurveyStat } from '../data/ServiceStats';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  surveyTitle = '';
  questions: Question[] = [];
  answers: any[] = [];
  surveyId: string = ""
  @ViewChild('stat', { static: false }) stat?: StatsBarComponent;
  view = false
  isAllowed: boolean = true
  isFetched: boolean = false
  surveyStats: SurveyStat[] = [];
  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveysService
  ) { }

  ngOnInit(): void {
    this.surveyTitle = this.route.snapshot.paramMap.get('title') || '';
    this.getSurveyQuestions();
  }

  async getSurveyQuestions() {
    const response = await this.surveyService.checkAnswerd(this.surveyTitle);
    this.isAllowed = !response?.data
    if (this.isAllowed) {
      const res = await this.surveyService.getSurveyQuestions(this.surveyTitle);
      this.questions = res?.data || [];
      if (this.questions.length > 0) {
        this.surveyId = this.questions[0].survey
      }
      // Initialize answers array with default values
      this.answers = this.questions.map(q => {
        if (q.type === 'multiple') return []; // array for multiple checkboxes
        else return null; // single and text answers start null
      });
    }
  }

  // Handle multiple checkbox toggle
  onCheckboxChange(questionIndex: number, optionIndex: number, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked
    if (!this.answers[questionIndex]) {
      this.answers[questionIndex] = [];
    }

    const optionId = this.questions[questionIndex].options?.[optionIndex]?._id;
    if (!optionId) return;

    if (checked) {
      this.answers[questionIndex].push(optionId);
    } else {
      this.answers[questionIndex] = this.answers[questionIndex].filter((id: string) => id !== optionId);
    }
  }

  // Check if checkbox is selected
  isChecked(questionIndex: number, optionIndex: number): boolean {
    const optionId = this.questions[questionIndex].options?.[optionIndex]?._id;
    if (!optionId) return false;

    return this.answers[questionIndex]?.includes(optionId);
  }
  submitSurvey() {
    const answersPayload = this.questions.map((question, index) => ({
      questionId: question._id,
      type: question.type,
      answer: this.answers[index]
    }));

    this.surveyService.submitAnswers({ surveyId: this.surveyId, answers: answersPayload })
      .then(() => alert('Survey submitted successfully!'))
      .catch(err => {
        console.error(err);
      });
  }

  async viewStats() {
    if (!this.isFetched) {
      const response = await this.surveyService.getSurveyStats(this.surveyTitle);
      this.surveyStats = response?.data!

      this.isFetched = true;
    }
    this.view = !this.view
  }

}
