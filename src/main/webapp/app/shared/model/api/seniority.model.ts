import { ICareerProfile } from 'app/shared/model/api/career-profile.model';
import { SeniorityName } from 'app/shared/model/enumerations/seniority-name.model';

export interface ISeniority {
  id?: number;
  name?: SeniorityName;
  careerProfile?: ICareerProfile;
}

export const defaultValue: Readonly<ISeniority> = {};
