import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BaseResponse } from '../data/BaseResponse';
import { SurveyAnswer, SurveyResponse } from '../data/SurveyResponse';
import { api } from '../environment';
import { Question } from '../data/Questions';
import { Category } from '../data/Category';
import { SurveyStat } from '../data/ServiceStats';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) { }
  getAllSurveys(condition = {}): Promise<BaseResponse<SurveyResponse[]> | undefined> {
    return this.http.post<BaseResponse<SurveyResponse[]>>(api.GETSURVEY, condition).pipe(map(data => data)).toPromise();
  }
  getSurveyQuestions(title: string): Promise<BaseResponse<Question[]> | undefined> {
    return this.http.get<BaseResponse<Question[]>>(api.GET_SURVEY_QUESTIONS, {
      params: { title }
    }).pipe(map(data => data)).toPromise();
  }
  getSurveyStats(title: string): Promise<BaseResponse<SurveyStat[]> | undefined> {
    return this.http.get<BaseResponse<SurveyStat[]>>(api.GET_SURVEY_STATS, {
      params: { title }
    }).pipe(map(data => data)).toPromise();
  }
  submitAnswers(payload: any): Promise<any> {
    return this.http.post(`${api.SUBMIT_ANSWERS}`, payload).toPromise();
  }
  getCategories(): Promise<BaseResponse<Category[]> | undefined> {
    return this.http.get<BaseResponse<Category[]>>(`${api.GET_CATEGORIES}`).pipe(map(data => data)).toPromise()
  }
  getMyAnswers(): Promise<BaseResponse<SurveyAnswer[]> | undefined> {
    return this.http.get<BaseResponse<SurveyAnswer[]>>(`${api.GET_ANSWERS}`).pipe(map(data => data)).toPromise()
  }
  checkAnswerd(title: string): Promise<BaseResponse<Boolean> | undefined> {
    return this.http.get<BaseResponse<Boolean>>(`${api.CHECK_ANSWERS}`, {
      params: { title }
    }).pipe(map(data => data)).toPromise()
  }
  createSurvey(payload: any): Promise<BaseResponse<string> | undefined> {
    return this.http.post(`${api.CREATE_SURVEY}`, payload).toPromise();
  }
}
