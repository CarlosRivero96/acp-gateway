import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import userData from 'app/entities/api/user-data/user-data.reducer';
// prettier-ignore
import careerProfile from 'app/entities/api/career-profile/career-profile.reducer';
// prettier-ignore
import seniority from 'app/entities/api/seniority/seniority.reducer';
// prettier-ignore
import mission from 'app/entities/api/mission/mission.reducer';
// prettier-ignore
import skill from 'app/entities/api/skill/skill.reducer';
// prettier-ignore
import category from 'app/entities/api/category/category.reducer';
// prettier-ignore
import userMission from 'app/entities/api/user-mission/user-mission.reducer';
// prettier-ignore
import userSkill from 'app/entities/api/user-skill/user-skill.reducer';
// prettier-ignore
import seniorityRequirement from 'app/entities/api/seniority-requirement/seniority-requirement.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

import missions from 'app/modules/account/missions/missions.reducer';
import seniorityManagement from 'app/modules/administration/seniority-management/seniority-management.reducer';

const rootReducer = {
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  userData,
  careerProfile,
  seniority,
  mission,
  skill,
  category,
  userMission,
  userSkill,
  seniorityRequirement,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
  missions,
  seniorityManagement,
};

export default rootReducer;
