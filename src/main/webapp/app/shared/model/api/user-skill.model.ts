import { IUserData } from 'app/shared/model/api/user-data.model';
import { ISkill } from 'app/shared/model/api/skill.model';

export interface IUserSkill {
  id?: number;
  level?: number;
  user?: IUserData;
  skill?: ISkill;
}

export const defaultValue: Readonly<IUserSkill> = {};
