import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './seniority.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const seniorityEntity = useAppSelector(state => state.seniority.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="seniorityDetailsHeading">
          <Translate contentKey="gatewayApp.apiSeniority.detail.title">Seniority</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{seniorityEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.apiSeniority.name">Name</Translate>
            </span>
          </dt>
          <dd>{seniorityEntity.name}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiSeniority.careerProfile">Career Profile</Translate>
          </dt>
          <dd>{seniorityEntity.careerProfile ? seniorityEntity.careerProfile.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/seniority" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/seniority/${seniorityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SeniorityDetail;
