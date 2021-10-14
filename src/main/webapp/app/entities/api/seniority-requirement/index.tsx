import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SeniorityRequirement from './seniority-requirement';
import SeniorityRequirementDetail from './seniority-requirement-detail';
import SeniorityRequirementUpdate from './seniority-requirement-update';
import SeniorityRequirementDeleteDialog from './seniority-requirement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SeniorityRequirementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SeniorityRequirementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SeniorityRequirementDetail} />
      <ErrorBoundaryRoute path={match.url} component={SeniorityRequirement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SeniorityRequirementDeleteDialog} />
  </>
);

export default Routes;
