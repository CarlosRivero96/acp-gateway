import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './user-data.reducer';
import { IUserData } from 'app/shared/model/api/user-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserData = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userDataList = useAppSelector(state => state.userData.entities);
  const loading = useAppSelector(state => state.userData.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-data-heading" data-cy="UserDataHeading">
        <Translate contentKey="gatewayApp.apiUserData.home.title">User Data</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiUserData.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiUserData.home.createLabel">Create new User Data</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userDataList && userDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.login">Login</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.birthdate">Birthdate</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.careerProfile">Career Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userDataList.map((userData, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userData.id}`} color="link" size="sm">
                      {userData.id}
                    </Button>
                  </td>
                  <td>{userData.login}</td>
                  <td>{userData.firstName}</td>
                  <td>{userData.lastName}</td>
                  <td>{userData.email}</td>
                  <td>
                    {userData.birthdate ? <TextFormat type="date" value={userData.birthdate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {userData.careerProfile ? (
                      <Link to={`career-profile/${userData.careerProfile.id}`}>{userData.careerProfile.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userData.login}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userData.login}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userData.login}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="gatewayApp.apiUserData.home.notFound">No User Data found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserData;
