import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CareerProfile from './career-profile';
import CareerProfileDetail from './career-profile-detail';
import CareerProfileUpdate from './career-profile-update';
import CareerProfileDeleteDialog from './career-profile-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CareerProfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CareerProfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CareerProfileDetail} />
      <ErrorBoundaryRoute path={match.url} component={CareerProfile} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CareerProfileDeleteDialog} />
  </>
);

export default Routes;
