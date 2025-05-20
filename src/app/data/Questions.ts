export interface QuestionOption {
  text: string;
  _id: string
}

export interface Question {
  _id?: string;          // اختياري إذا تستخدمه من MongoDB
  survey: string;        // surveyId كـ ObjectId string
  text: string;
  type: 'single' | 'multiple' | 'text';
  options?: QuestionOption[];  // خيارات السؤال (يمكن أن تكون فارغة أو غير موجودة للسؤال النصي)
  createdAt?: string;
  updatedAt?: string;
}
