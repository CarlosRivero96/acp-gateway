import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './seniority-requirement.reducer';
import { ISeniorityRequirement } from 'app/shared/model/api/seniority-requirement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityRequirement = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const seniorityRequirementList = useAppSelector(state => state.seniorityRequirement.entities);
  const loading = useAppSelector(state => state.seniorityRequirement.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="seniority-requirement-heading" data-cy="SeniorityRequirementHeading">
        <Translate contentKey="gatewayApp.apiSeniorityRequirement.home.title">Seniority Requirements</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiSeniorityRequirement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiSeniorityRequirement.home.createLabel">Create new Seniority Requirement</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {seniorityRequirementList && seniorityRequirementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniorityRequirement.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniorityRequirement.level">Level</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniorityRequirement.skill">Skill</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniorityRequirement.seniority">Seniority</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {seniorityRequirementList.map((seniorityRequirement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${seniorityRequirement.id}`} color="link" size="sm">
                      {seniorityRequirement.id}
                    </Button>
                  </td>
                  <td>{seniorityRequirement.level}</td>
                  <td>
                    {seniorityRequirement.skill ? (
                      <Link to={`skill/${seniorityRequirement.skill.id}`}>{seniorityRequirement.skill.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {seniorityRequirement.seniority ? (
                      <Link to={`seniority/${seniorityRequirement.seniority.id}`}>{seniorityRequirement.seniority.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${seniorityRequirement.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${seniorityRequirement.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${seniorityRequirement.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="gatewayApp.apiSeniorityRequirement.home.notFound">No Seniority Requirements found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SeniorityRequirement;
