import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './user-mission.reducer';
import { IUserMission } from 'app/shared/model/api/user-mission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserMission = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userMissionList = useAppSelector(state => state.userMission.entities);
  const loading = useAppSelector(state => state.userMission.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-mission-heading" data-cy="UserMissionHeading">
        <Translate contentKey="gatewayApp.apiUserMission.home.title">User Missions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiUserMission.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiUserMission.home.createLabel">Create new User Mission</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userMissionList && userMissionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiUserMission.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserMission.completed">Completed</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserMission.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserMission.mission">Mission</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userMissionList.map((userMission, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userMission.id}`} color="link" size="sm">
                      {userMission.id}
                    </Button>
                  </td>
                  <td>{userMission.completed ? 'true' : 'false'}</td>
                  <td>{userMission.user ? <Link to={`user-data/${userMission.user.id}`}>{userMission.user.id}</Link> : ''}</td>
                  <td>{userMission.mission ? <Link to={`mission/${userMission.mission.id}`}>{userMission.mission.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userMission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userMission.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userMission.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gatewayApp.apiUserMission.home.notFound">No User Missions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserMission;
