import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Skills from './skills';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={match.url} component={Skills} />
  </div>
);

export default Routes;
