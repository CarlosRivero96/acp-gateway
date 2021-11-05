import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICareerProfile } from 'app/shared/model/api/career-profile.model';
import { getEntities as getCareerProfiles } from 'app/entities/api/career-profile/career-profile.reducer';
import { getEntity, updateEntity, reset } from './userdata.reducer';
import { IUserData } from 'app/shared/model/api/user-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';

export const UserDataForm = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const careerProfiles = useAppSelector(state => state.careerProfile.entities);
  const userDataEntity = useAppSelector(state => state.userData.entity);
  const loading = useAppSelector(state => state.userData.loading);
  const updating = useAppSelector(state => state.userData.updating);
  const updateSuccess = useAppSelector(state => state.userData.updateSuccess);
  const account = useAppSelector(state => state.authentication.account);

  const handleClose = () => {
    props.history.push('/account/userdata');
  };

  useEffect(() => {
    dispatch(getSession());
    dispatch(getEntity(account.login));
    dispatch(getCareerProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...userDataEntity,
      ...values,
      careerProfile: careerProfiles.find(it => it.id.toString() === values.careerProfileId.toString()),
    };

    dispatch(updateEntity(entity));
  };

  const defaultValues = {
    ...userDataEntity,
    careerProfileId: userDataEntity?.careerProfile?.id,
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiUserData.home.editLabel" data-cy="UserDataCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiUserData.home.editLabel">Edit User Data</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues} onSubmit={saveEntity}>
              <ValidatedField
                label={translate('gatewayApp.apiUserData.login')}
                id="user-data-login"
                name="login"
                data-cy="login"
                type="text"
                disabled={true}
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.apiUserData.firstName')}
                id="user-data-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('gatewayApp.apiUserData.lastName')}
                id="user-data-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField
                label={translate('gatewayApp.apiUserData.email')}
                id="user-data-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.apiUserData.birthdate')}
                id="user-data-birthdate"
                name="birthdate"
                data-cy="birthdate"
                type="date"
              />
              <ValidatedField
                id="user-data-careerProfile"
                name="careerProfileId"
                data-cy="careerProfile"
                label={translate('gatewayApp.apiUserData.careerProfile')}
                type="select"
              >
                <option value="" key="0" />
                {careerProfiles
                  ? careerProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/account/userdata" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="success" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserDataForm;
