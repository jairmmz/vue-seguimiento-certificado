export interface Survey {
  id?: number
  title: string
  description: string
  guidelines: string
  message_welcome: string
  message_finish: string
  status: string
}

export interface SurveyResponse {
  message: string
  data: Survey | null
  code: number
}

export interface SurveysResponse {
  message: string
  data: Survey[]
  code: number
}