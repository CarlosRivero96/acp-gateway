import { ISkill } from 'app/shared/model/api/skill.model';
import { ISeniority } from 'app/shared/model/api/seniority.model';

export interface ISeniorityRequirement {
  id?: number;
  level?: number;
  skill?: ISkill;
  seniority?: ISeniority;
}

export const defaultValue: Readonly<ISeniorityRequirement> = {};
