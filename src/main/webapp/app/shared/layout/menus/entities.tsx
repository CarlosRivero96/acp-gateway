import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/user-data">
      <Translate contentKey="global.menu.entities.apiUserData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/career-profile">
      <Translate contentKey="global.menu.entities.apiCareerProfile" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/seniority">
      <Translate contentKey="global.menu.entities.apiSeniority" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mission">
      <Translate contentKey="global.menu.entities.apiMission" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/skill">
      <Translate contentKey="global.menu.entities.apiSkill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.apiCategory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-mission">
      <Translate contentKey="global.menu.entities.apiUserMission" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-skill">
      <Translate contentKey="global.menu.entities.apiUserSkill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/seniority-requirement">
      <Translate contentKey="global.menu.entities.apiSeniorityRequirement" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
