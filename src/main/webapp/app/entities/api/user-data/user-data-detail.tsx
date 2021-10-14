import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-data.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserDataDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userDataEntity = useAppSelector(state => state.userData.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userDataDetailsHeading">
          <Translate contentKey="gatewayApp.apiUserData.detail.title">UserData</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userDataEntity.id}</dd>
          <dt>
            <span id="login">
              <Translate contentKey="gatewayApp.apiUserData.login">Login</Translate>
            </span>
          </dt>
          <dd>{userDataEntity.login}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="gatewayApp.apiUserData.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{userDataEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="gatewayApp.apiUserData.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{userDataEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="gatewayApp.apiUserData.email">Email</Translate>
            </span>
          </dt>
          <dd>{userDataEntity.email}</dd>
          <dt>
            <span id="birthdate">
              <Translate contentKey="gatewayApp.apiUserData.birthdate">Birthdate</Translate>
            </span>
          </dt>
          <dd>
            {userDataEntity.birthdate ? <TextFormat value={userDataEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.apiUserData.careerProfile">Career Profile</Translate>
          </dt>
          <dd>{userDataEntity.careerProfile ? userDataEntity.careerProfile.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-data" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-data/${userDataEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserDataDetail;
