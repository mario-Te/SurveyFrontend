import { Category } from "./Category";
import { Question } from "./Questions";
import { User } from "./User";

export interface SurveyResponse {
  _id: string;
  title: string;
  description: string;
  category: Category;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}
export interface Option {
  _id: string;
  text: string;
}
export interface Answer {
  _id: string;
  questionId: Question;
  type: 'single' | 'multiple' | 'text';
  answer: string
}
export interface SurveyAnswer {
  _id: string;
  surveyId: SurveyResponse
  answers: Answer[];
  submittedAt: string;
}
