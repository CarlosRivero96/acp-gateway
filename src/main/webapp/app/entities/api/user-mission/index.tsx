import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserMission from './user-mission';
import UserMissionDetail from './user-mission-detail';
import UserMissionUpdate from './user-mission-update';
import UserMissionDeleteDialog from './user-mission-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserMissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserMissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserMissionDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserMission} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserMissionDeleteDialog} />
  </>
);

export default Routes;
