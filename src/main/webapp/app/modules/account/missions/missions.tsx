/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { byteSize, translate, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { getAvailable, getStarted, getCompleted } from './missions.reducer';
import { IMission } from 'app/shared/model/api/mission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Missions = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const availableList = useAppSelector(state => state.missions.available);
  const startedList = useAppSelector(state => state.missions.started);
  const completedList = useAppSelector(state => state.missions.completed);
  const loading = useAppSelector(state => state.missions.loading);

  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === '1') dispatch(getAvailable({}));
    else if (activeTab === '2') dispatch(getStarted({}));
    else if (activeTab === '3') dispatch(getCompleted({}));
  }, [activeTab]);

  const { match } = props;

  return (
    <div>
      <h2 id="mission-heading" data-cy="MissionHeading">
        <Translate contentKey="gatewayApp.apiMission.home.title">Missions</Translate>
      </h2>

      <Nav tabs fill>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            <Translate contentKey="gatewayApp.apiMission.category.available">Available</Translate>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            <Translate contentKey="gatewayApp.apiMission.category.started">In progress</Translate>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            <Translate contentKey="gatewayApp.apiMission.category.completed">Completed</Translate>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab} style={{ paddingTop: '20px' }}>
        <TabPane tabId="1">
          <h4>
            <Translate contentKey="gatewayApp.apiMission.category.available">Available</Translate>
          </h4>
          <div className="table-responsive">
            {availableList && availableList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.name">Name</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.skill">Skill</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.levelRequired">Level Required</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {availableList.map((mission, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable">
                      <td>{mission.name}</td>
                      <td>{mission.skill ? <Link to={`/skill/${mission.skill.id}`}>{mission.skill.name}</Link> : ''}</td>
                      <td>{mission.levelRequired}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${mission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
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
                  <Translate contentKey="gatewayApp.apiMission.home.notFound">No Missions found</Translate>
                </div>
              )
            )}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <h4>
            <Translate contentKey="gatewayApp.apiMission.category.started">In progress</Translate>
          </h4>
          <div className="table-responsive">
            {startedList && startedList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.name">Name</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.skill">Skill</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.levelRequired">Level Required</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {startedList.map((mission, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable">
                      <td>{mission.name}</td>
                      <td>{mission.skill ? <Link to={`skill/${mission.skill.id}`}>{mission.skill.name}</Link> : ''}</td>
                      <td>{mission.levelRequired}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${mission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
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
                  <Translate contentKey="gatewayApp.apiMission.home.notFound">No Missions found</Translate>
                </div>
              )
            )}
          </div>
        </TabPane>
        <TabPane tabId="3">
          <h4>
            <Translate contentKey="gatewayApp.apiMission.category.completed">Completed</Translate>
          </h4>
          <div className="table-responsive">
            {completedList && completedList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.name">Name</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.skill">Skill</Translate>
                    </th>
                    <th>
                      <Translate contentKey="gatewayApp.apiMission.levelRequired">Level Required</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {completedList.map((mission, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable">
                      <td>{mission.name}</td>
                      <td>{mission.skill ? <Link to={`skill/${mission.skill.id}`}>{mission.skill.name}</Link> : ''}</td>
                      <td>{mission.levelRequired}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${mission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
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
                  <Translate contentKey="gatewayApp.apiMission.home.notFound">No Missions found</Translate>
                </div>
              )
            )}
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Missions;
