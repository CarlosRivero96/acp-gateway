import dayjs from 'dayjs';
import { ICareerProfile } from 'app/shared/model/api/career-profile.model';

export interface IUserData {
  id?: number;
  login?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  birthdate?: string | null;
  careerProfile?: ICareerProfile | null;
}

export const defaultValue: Readonly<IUserData> = {};
