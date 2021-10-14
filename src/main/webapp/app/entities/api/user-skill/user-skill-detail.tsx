import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-skill.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserSkillDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userSkillEntity = useAppSelector(state => state.userSkill.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userSkillDetailsHeading">
          <Translate contentKey="gatewayApp.apiUserSkill.detail.title">UserSkill</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userSkillEntity.id}</dd>
          <dt>
            <span id="level">
              <Translate contentKey="gatewayApp.apiUserSkill.level">Level</Translate>
            </span>
          </dt>
          <dd>{userSkillEntity.level}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiUserSkill.user">User</Translate>
          </dt>
          <dd>{userSkillEntity.user ? userSkillEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiUserSkill.skill">Skill</Translate>
          </dt>
          <dd>{userSkillEntity.skill ? userSkillEntity.skill.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-skill" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-skill/${userSkillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserSkillDetail;
