import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { translate, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCurrentUserSkills } from 'app/entities/api/user-skill/user-skill.reducer';
import { IUserSkill } from 'app/shared/model/api/user-skill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Skills = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userSkillList = useAppSelector(state => state.userSkill.entities);
  const loading = useAppSelector(state => state.userSkill.loading);

  useEffect(() => {
    dispatch(getCurrentUserSkills({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getCurrentUserSkills({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-skill-heading" data-cy="UserSkillHeading">
        <Translate contentKey="gatewayApp.apiSkill.home.title">Skills</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiUserSkill.home.refreshListLabel">Refresh List</Translate>
          </Button>
        </div>
      </h2>
      <div className="table-responsive">
        {userSkillList && userSkillList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.skill">Skill</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiUserSkill.level">Level</Translate>
                </th>
                <th></th>
                <th>
                  <Translate contentKey="entity.action.actions">Actions</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userSkillList.map((userSkill, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{userSkill.skill ? <Link to={`skill/${userSkill.skill.id}`}>{userSkill.skill.name}</Link> : ''}</td>
                  <td>{userSkill.level}</td>
                  <td>{translate(`gatewayApp.apiUserSkill.levelDescription.${userSkill.level}`)}</td>
                  <td>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`skill/${userSkill.id}`} color="info" size="sm" data-cy="entityDetailsButton">
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
              <Translate contentKey="gatewayApp.apiSkill.home.notFound">No Skills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Skills;
