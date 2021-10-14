import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './mission.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const MissionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const missionEntity = useAppSelector(state => state.mission.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="missionDetailsHeading">
          <Translate contentKey="gatewayApp.apiMission.detail.title">Mission</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{missionEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.apiMission.name">Name</Translate>
            </span>
          </dt>
          <dd>{missionEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.apiMission.description">Description</Translate>
            </span>
          </dt>
          <dd>{missionEntity.description}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="gatewayApp.apiMission.active">Active</Translate>
            </span>
          </dt>
          <dd>{missionEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="levelRequired">
              <Translate contentKey="gatewayApp.apiMission.levelRequired">Level Required</Translate>
            </span>
          </dt>
          <dd>{missionEntity.levelRequired}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiMission.skill">Skill</Translate>
          </dt>
          <dd>{missionEntity.skill ? missionEntity.skill.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/mission" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mission/${missionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MissionDetail;
