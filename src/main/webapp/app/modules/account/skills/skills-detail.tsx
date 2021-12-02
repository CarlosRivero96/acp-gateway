import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from 'app/entities/api/skill/skill.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SkillsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const skillEntity = useAppSelector(state => state.skill.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="skillDetailsHeading">
          <Translate contentKey="gatewayApp.apiSkill.detail.title">Skill</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{skillEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.apiSkill.name">Name</Translate>
            </span>
          </dt>
          <dd>{skillEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.apiSkill.description">Description</Translate>
            </span>
          </dt>
          <dd>{skillEntity.description}</dd>
          <dt>
            <Translate contentKey="gatewayApp.apiSkill.category">Category</Translate>
          </dt>
          <dd>{skillEntity.category ? skillEntity.category.name : ''}</dd>
        </dl>
        <Button replace color="info" data-cy="entityDetailsBackButton" onClick={() => props.history.goBack()}>
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        {/* <Button tag={Link} to={`/skill/${skillEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button> */}
      </Col>
    </Row>
  );
};

export default SkillsDetail;
