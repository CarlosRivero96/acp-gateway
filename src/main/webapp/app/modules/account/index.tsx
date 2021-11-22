import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Settings from './settings/settings';
import Password from './password/password';
import UserData from './userdata/userdata';
import UserDataForm from './userdata/userdata-form';
import Missions from './missions';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/settings`} component={Settings} />
    <ErrorBoundaryRoute path={`${match.url}/password`} component={Password} />
    <ErrorBoundaryRoute path={`${match.url}/missions`} component={Missions} />
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/userdata`} component={UserData} />
      <ErrorBoundaryRoute exact path={`${match.url}/userdata/edit`} component={UserDataForm} />
    </Switch>
  </div>
);

export default Routes;
