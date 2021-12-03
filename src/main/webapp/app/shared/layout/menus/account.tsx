import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="wrench" to="/account/userdata" data-cy="settings">
      <Translate contentKey="gatewayApp.apiUserData.home.title">User Data</Translate>
    </MenuItem>
    <MenuItem icon={faStar} to="/account/missions" data-cy="missions">
      <Translate contentKey="gatewayApp.apiMission.home.title">Missions</Translate>
    </MenuItem>
    <MenuItem icon="book" to="/account/skills" data-cy="skills">
      <Translate contentKey="gatewayApp.apiSkill.home.title">Skills</Translate>
    </MenuItem>
    {/* <MenuItem icon="wrench" to="/account/settings" data-cy="settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem> */}
    <MenuItem icon="lock" to="/account/password" data-cy="passwordItem">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout" data-cy="logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login" data-cy="login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="user-plus" to="/account/register" data-cy="register">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu" data-cy="accountMenu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
