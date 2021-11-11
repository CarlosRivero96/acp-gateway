import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserData from './api/user-data';
import CareerProfile from './api/career-profile';
import Seniority from './api/seniority';
import Mission from './api/mission';
import Skill from './api/skill';
import Category from './api/category';
import UserMission from './api/user-mission';
import UserSkill from './api/user-skill';
import SeniorityRequirement from './api/seniority-requirement';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}user-data`} component={UserData} />
      <ErrorBoundaryRoute path={`${match.url}career-profile`} component={CareerProfile} />
      <ErrorBoundaryRoute path={`${match.url}seniority`} component={Seniority} />
      <ErrorBoundaryRoute path={`${match.url}mission`} component={Mission} />
      <ErrorBoundaryRoute path={`${match.url}skill`} component={Skill} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}user-mission`} component={UserMission} />
      <ErrorBoundaryRoute path={`${match.url}user-skill`} component={UserSkill} />
      <ErrorBoundaryRoute path={`${match.url}seniority-requirement`} component={SeniorityRequirement} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
