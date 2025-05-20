const env = 1;
function getEnvUrls(environment: number) {
  switch (environment) {
    //Local
    case 1:
      return 'http://localhost:3000/api';
    default:

      return ""
  }
}
const apiUrl = getEnvUrls(1)


export const api = {
  REGISTER: `${apiUrl}/auth/register`,
  LOGIN: `${apiUrl}/auth/login`,
  LOGOUT: `${apiUrl}/auth/logout`,
  GETSURVEY: `${apiUrl}/survey/getAll`,
  CHECK_ANSWERS: `${apiUrl}/survey/check`,
  GET_CATEGORIES: `${apiUrl}/categories/getCategories`,
  GET_SURVEY_QUESTIONS: `${apiUrl}/survey/getSurveyDetailsByName`,
  CREATE_SURVEY: `${apiUrl}/survey/create-survey`,
  GET_SURVEY_STATS: `${apiUrl}/survey/stats`,
  GET_ANSWERS: `${apiUrl}/survey/my-answers`,
  SUBMIT_ANSWERS: `${apiUrl}/survey/submit-votes`
}
