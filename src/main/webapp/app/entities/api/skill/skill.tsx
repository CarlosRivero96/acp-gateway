import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './skill.reducer';
import { ISkill } from 'app/shared/model/api/skill.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Skill = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const skillList = useAppSelector(state => state.skill.entities);
  const loading = useAppSelector(state => state.skill.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="skill-heading" data-cy="SkillHeading">
        <Translate contentKey="gatewayApp.apiSkill.home.title">Skills</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiSkill.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiSkill.home.createLabel">Create new Skill</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {skillList && skillList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiSkill.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSkill.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSkill.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSkill.category">Category</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {skillList.map((skill, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${skill.id}`} color="link" size="sm">
                      {skill.id}
                    </Button>
                  </td>
                  <td>{skill.name}</td>
                  <td>{skill.description}</td>
                  <td>{skill.category ? <Link to={`category/${skill.category.id}`}>{skill.category.name}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${skill.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${skill.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${skill.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gatewayApp.apiSkill.home.notFound">No Skills found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Skill;
