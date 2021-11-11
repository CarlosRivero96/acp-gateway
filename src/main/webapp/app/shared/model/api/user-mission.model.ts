import { IUserData } from 'app/shared/model/api/user-data.model';
import { IMission } from 'app/shared/model/api/mission.model';

export interface IUserMission {
  id?: number;
  completed?: boolean;
  user?: IUserData;
  mission?: IMission;
}

export const defaultValue: Readonly<IUserMission> = {
  completed: false,
};
