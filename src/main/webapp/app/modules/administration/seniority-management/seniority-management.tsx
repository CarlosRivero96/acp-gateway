import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUserData, getUsers } from './seniority-management.reducer';
import { IUserData } from 'app/shared/model/api/user-data.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityManagement = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userDataList = useAppSelector(state => state.seniorityManagement.usersList);
  const loading = useAppSelector(state => state.seniorityManagement.loading);

  useEffect(() => {
    dispatch(getUsers({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getUsers({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-data-heading" data-cy="UserDataHeading">
        <Translate contentKey="gatewayApp.apiSeniority.home.managementTitle">Seniority Management</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiUserData.home.refreshListLabel">Refresh List</Translate>
          </Button>
        </div>
      </h2>
      <div className="table-responsive">
        {userDataList && userDataList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
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
                  <Translate contentKey="gatewayApp.apiUserData.careerProfile">Career Profile</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserData.seniority">Seniority</Translate>
                </th>
                <th>
                  <Translate contentKey="entity.action.actions">Actions</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userDataList.map((userData, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{userData.login}</td>
                  <td>{userData.firstName}</td>
                  <td>{userData.lastName}</td>
                  <td>
                    {userData.careerProfile ? (
                      <Link to={`career-profile/${userData.careerProfile.id}`}>{userData.careerProfile.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{userData.seniority}</td>
                  <td>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userData.login}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
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

export default SeniorityManagement;
