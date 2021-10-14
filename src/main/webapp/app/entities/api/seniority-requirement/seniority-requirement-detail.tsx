import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './seniority-requirement.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityRequirementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const seniorityRequirementEntity = useAppSelector(state => state.seniorityRequirement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="seniorityRequirementDetailsHeading">
          <Translate contentKey="gatewayApp.apiSeniorityRequirement.detail.title">SeniorityRequirement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{seniorityRequirementEntity.id}</dd>
          <dt>
            <span id="level">
              <Translate contentKey="gatewayApp.apiSeniorityRequirement.level">Level</Translate>
            </span>
          </dt>
          <dd>{seniorityRequirementEntity.level}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiSeniorityRequirement.skill">Skill</Translate>
          </dt>
          <dd>{seniorityRequirementEntity.skill ? seniorityRequirementEntity.skill.name : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiSeniorityRequirement.seniority">Seniority</Translate>
          </dt>
          <dd>{seniorityRequirementEntity.seniority ? seniorityRequirementEntity.seniority.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/seniority-requirement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/seniority-requirement/${seniorityRequirementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SeniorityRequirementDetail;
