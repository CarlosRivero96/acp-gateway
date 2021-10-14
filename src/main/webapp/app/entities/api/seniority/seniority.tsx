import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './seniority.reducer';
import { ISeniority } from 'app/shared/model/api/seniority.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Seniority = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const seniorityList = useAppSelector(state => state.seniority.entities);
  const loading = useAppSelector(state => state.seniority.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="seniority-heading" data-cy="SeniorityHeading">
        <Translate contentKey="gatewayApp.apiSeniority.home.title">Seniorities</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiSeniority.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiSeniority.home.createLabel">Create new Seniority</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {seniorityList && seniorityList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniority.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniority.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiSeniority.careerProfile">Career Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {seniorityList.map((seniority, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${seniority.id}`} color="link" size="sm">
                      {seniority.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`gatewayApp.SeniorityName.${seniority.name}`} />
                  </td>
                  <td>
                    {seniority.careerProfile ? (
                      <Link to={`career-profile/${seniority.careerProfile.id}`}>{seniority.careerProfile.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${seniority.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seniority.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${seniority.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="gatewayApp.apiSeniority.home.notFound">No Seniorities found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Seniority;
