import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Missions from './missions';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={Missions} />
    </Switch>
  </div>
);

export default Routes;
