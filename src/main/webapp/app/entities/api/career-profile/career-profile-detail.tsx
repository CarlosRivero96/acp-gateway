import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './career-profile.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CareerProfileDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const careerProfileEntity = useAppSelector(state => state.careerProfile.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="careerProfileDetailsHeading">
          <Translate contentKey="gatewayApp.apiCareerProfile.detail.title">CareerProfile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{careerProfileEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.apiCareerProfile.name">Name</Translate>
            </span>
          </dt>
          <dd>{careerProfileEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.apiCareerProfile.description">Description</Translate>
            </span>
          </dt>
          <dd>{careerProfileEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/career-profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/career-profile/${careerProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CareerProfileDetail;
