export interface CrowdData {
  areaName: string;
  areaCode: string;
  population: {
    level: string;
    message: string;
    min: string;
    max: string;
    time: string;
  };
  weather: {
    temp: string;
    max: string;
    min: string;
    news: string;
    air: string;
    airMsg: string;
    uvMsg: string;
  };
}

export interface CrowdResponse {
  success: boolean;
  data?: CrowdData;
  message?: string;
}