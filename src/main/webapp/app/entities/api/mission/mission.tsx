import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './mission.reducer';
import { IMission } from 'app/shared/model/api/mission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Mission = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const missionList = useAppSelector(state => state.mission.entities);
  const loading = useAppSelector(state => state.mission.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="mission-heading" data-cy="MissionHeading">
        <Translate contentKey="gatewayApp.apiMission.home.title">Missions</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiMission.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiMission.home.createLabel">Create new Mission</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {missionList && missionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.levelRequired">Level Required</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiMission.skill">Skill</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {missionList.map((mission, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${mission.id}`} color="link" size="sm">
                      {mission.id}
                    </Button>
                  </td>
                  <td>{mission.name}</td>
                  <td>{mission.description}</td>
                  <td>{mission.active ? 'true' : 'false'}</td>
                  <td>{mission.levelRequired}</td>
                  <td>{mission.skill ? <Link to={`skill/${mission.skill.id}`}>{mission.skill.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${mission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mission.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${mission.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gatewayApp.apiMission.home.notFound">No Missions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Mission;
