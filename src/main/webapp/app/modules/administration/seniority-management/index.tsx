import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import seniorityManagement from './seniority-management';
import SeniorityManagementForm from './seniority-management-form';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={SeniorityManagementForm} />
    <ErrorBoundaryRoute path={match.url} component={seniorityManagement} />
  </div>
);

export default Routes;
