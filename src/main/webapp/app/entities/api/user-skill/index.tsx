import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserSkill from './user-skill';
import UserSkillDetail from './user-skill-detail';
import UserSkillUpdate from './user-skill-update';
import UserSkillDeleteDialog from './user-skill-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserSkillUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserSkillDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserSkill} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserSkillDeleteDialog} />
  </>
);

export default Routes;
