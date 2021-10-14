import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './career-profile.reducer';
import { ICareerProfile } from 'app/shared/model/api/career-profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CareerProfile = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const careerProfileList = useAppSelector(state => state.careerProfile.entities);
  const loading = useAppSelector(state => state.careerProfile.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="career-profile-heading" data-cy="CareerProfileHeading">
        <Translate contentKey="gatewayApp.apiCareerProfile.home.title">Career Profiles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gatewayApp.apiCareerProfile.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="gatewayApp.apiCareerProfile.home.createLabel">Create new Career Profile</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {careerProfileList && careerProfileList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="gatewayApp.apiCareerProfile.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiCareerProfile.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.apiCareerProfile.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {careerProfileList.map((careerProfile, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${careerProfile.id}`} color="link" size="sm">
                      {careerProfile.id}
                    </Button>
                  </td>
                  <td>{careerProfile.name}</td>
                  <td>{careerProfile.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${careerProfile.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${careerProfile.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${careerProfile.id}/delete`}
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
              <Translate contentKey="gatewayApp.apiCareerProfile.home.notFound">No Career Profiles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CareerProfile;
