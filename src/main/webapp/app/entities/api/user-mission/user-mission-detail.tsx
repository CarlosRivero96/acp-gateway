import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-mission.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserMissionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userMissionEntity = useAppSelector(state => state.userMission.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userMissionDetailsHeading">
          <Translate contentKey="gatewayApp.apiUserMission.detail.title">UserMission</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userMissionEntity.id}</dd>
          <dt>
            <span id="completed">
              <Translate contentKey="gatewayApp.apiUserMission.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{userMissionEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiUserMission.user">User</Translate>
          </dt>
          <dd>{userMissionEntity.user ? userMissionEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiUserMission.mission">Mission</Translate>
          </dt>
          <dd>{userMissionEntity.mission ? userMissionEntity.mission.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-mission" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-mission/${userMissionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserMissionDetail;
