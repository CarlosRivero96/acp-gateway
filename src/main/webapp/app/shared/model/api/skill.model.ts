import { ICategory } from 'app/shared/model/api/category.model';

export interface ISkill {
  id?: number;
  name?: string;
  description?: string;
  category?: ICategory;
}

export const defaultValue: Readonly<ISkill> = {};
