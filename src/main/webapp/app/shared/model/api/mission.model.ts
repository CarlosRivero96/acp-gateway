import { ISkill } from 'app/shared/model/api/skill.model';

export interface IMission {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
  levelRequired?: number;
  skill?: ISkill;
}

export const defaultValue: Readonly<IMission> = {
  active: false,
};
