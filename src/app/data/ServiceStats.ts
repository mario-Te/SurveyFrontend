export interface SurveyStat {
  question: string;
  type: 'single' | 'multiple' | 'text';
  summary: {
    [key: string]: number | string[]; // string[] only for 'text' type
  };
}
