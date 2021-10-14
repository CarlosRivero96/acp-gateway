import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './user-skill.reducer';
import { IUserSkill } from 'app/shared/model/api/user-skill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserSkill = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userSkillList = useAppSelector(state => state.userSkill.entities);
  const loading = useAppSelector(state => state.userSkill.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-skill-heading" data-cy="UserSkillHeading">
        <Translate contentKey="gatewayApp.apiUserSkill.home.title">User Skills</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiUserSkill.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiUserSkill.home.createLabel">Create new User Skill</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userSkillList && userSkillList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.skill">Skill</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userSkillList.map((userSkill, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userSkill.id}`} color="link" size="sm">
                      {userSkill.id}
                    </Button>
                  </td>
                  <td>{userSkill.level}</td>
                  <td>{userSkill.user ? <Link to={`user-data/${userSkill.user.id}`}>{userSkill.user.id}</Link> : ''}</td>
                  <td>{userSkill.skill ? <Link to={`skill/${userSkill.skill.id}`}>{userSkill.skill.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userSkill.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userSkill.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userSkill.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gatewayApp.apiUserSkill.home.notFound">No User Skills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserSkill;
