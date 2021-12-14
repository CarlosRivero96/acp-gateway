import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, getMyData, reset } from 'app/entities/api/user-data/user-data.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';

export const UserData = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    dispatch(getMyData());
  }, []);

  const userDataEntity = useAppSelector(state => state.userData.entity);
  const { match } = props;

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userDataDetailsHeading">
          <Translate contentKey="gatewayApp.apiUserData.detail.title">UserData</Translate>
        </h2>
        <dl className="jh-entity-details">
          <Row>
            <Col md="2">
              <dt>
                <span id="login">
                  <Translate contentKey="gatewayApp.apiUserData.login">Login</Translate>
                </span>
              </dt>
            </Col>
            <Col>
              <dd>{userDataEntity.login}</dd>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <dt>
                <span id="firstName">
                  <Translate contentKey="gatewayApp.apiUserData.firstName">First Name</Translate>
                </span>
              </dt>
            </Col>
            <Col>
              <dd>{userDataEntity.firstName}</dd>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <dt>
                <span id="lastName">
                  <Translate contentKey="gatewayApp.apiUserData.lastName">Last Name</Translate>
                </span>
              </dt>
            </Col>
            <Col>
              <dd>{userDataEntity.lastName}</dd>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <dt>
                <span id="email">
                  <Translate contentKey="gatewayApp.apiUserData.email">Email</Translate>
                </span>
              </dt>
            </Col>
            <Col>
              <dd>{userDataEntity.email}</dd>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <dt>
                <span id="birthdate">
                  <Translate contentKey="gatewayApp.apiUserData.birthdate">Birthdate</Translate>
                </span>
              </dt>
            </Col>
            <Col>
              <dd>
                {userDataEntity.birthdate ? (
                  <TextFormat value={userDataEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </dd>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <dt>
                <Translate contentKey="gatewayApp.apiUserData.careerProfile">Career Profile</Translate>
              </dt>
            </Col>
            <Col>
              <dd>
                {userDataEntity.careerProfile ? userDataEntity.careerProfile.name : ''}
                {userDataEntity.seniority ? ` - ${userDataEntity.seniority}` : ''}
              </dd>
            </Col>
          </Row>
        </dl>
        <Button tag={Link} to={`${match.url}/edit`} color="success" size="md" data-cy="entityEditButton" replace>
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserData;
