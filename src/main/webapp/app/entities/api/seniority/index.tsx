import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Seniority from './seniority';
import SeniorityDetail from './seniority-detail';
import SeniorityUpdate from './seniority-update';
import SeniorityDeleteDialog from './seniority-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SeniorityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SeniorityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SeniorityDetail} />
      <ErrorBoundaryRoute path={match.url} component={Seniority} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SeniorityDeleteDialog} />
  </>
);

export default Routes;
