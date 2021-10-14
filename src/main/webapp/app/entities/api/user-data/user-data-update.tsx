import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICareerProfile } from 'app/shared/model/api/career-profile.model';
import { getEntities as getCareerProfiles } from 'app/entities/api/career-profile/career-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-data.reducer';
import { IUserData } from 'app/shared/model/api/user-data.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserDataUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const careerProfiles = useAppSelector(state => state.careerProfile.entities);
  const userDataEntity = useAppSelector(state => state.userData.entity);
  const loading = useAppSelector(state => state.userData.loading);
  const updating = useAppSelector(state => state.userData.updating);
  const updateSuccess = useAppSelector(state => state.userData.updateSuccess);

  const handleClose = () => {
    props.history.push('/user-data');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

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

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...userDataEntity,
          careerProfileId: userDataEntity?.careerProfile?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiUserData.home.createOrEditLabel" data-cy="UserDataCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiUserData.home.createOrEditLabel">Create or edit a UserData</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-data-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.apiUserData.login')}
                id="user-data-login"
                name="login"
                data-cy="login"
                type="text"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-data" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
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

export default UserDataUpdate;
