import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Missions from './missions';
import MissionsDetail from './missions-detail';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MissionsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Missions} />
    </Switch>
  </div>
);

export default Routes;
