import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICareerProfile } from 'app/shared/model/api/career-profile.model';
import { getEntities as getCareerProfiles } from 'app/entities/api/career-profile/career-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seniority.reducer';
import { ISeniority } from 'app/shared/model/api/seniority.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const careerProfiles = useAppSelector(state => state.careerProfile.entities);
  const seniorityEntity = useAppSelector(state => state.seniority.entity);
  const loading = useAppSelector(state => state.seniority.loading);
  const updating = useAppSelector(state => state.seniority.updating);
  const updateSuccess = useAppSelector(state => state.seniority.updateSuccess);

  const handleClose = () => {
    props.history.push('/seniority');
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
      ...seniorityEntity,
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
          name: 'JR',
          ...seniorityEntity,
          careerProfileId: seniorityEntity?.careerProfile?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiSeniority.home.createOrEditLabel" data-cy="SeniorityCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiSeniority.home.createOrEditLabel">Create or edit a Seniority</Translate>
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
                  id="seniority-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.apiSeniority.name')}
                id="seniority-name"
                name="name"
                data-cy="name"
                type="select"
              >
                <option value="JR">{translate('gatewayApp.SeniorityName.JR')}</option>
                <option value="JRADV">{translate('gatewayApp.SeniorityName.JRADV')}</option>
                <option value="SSR">{translate('gatewayApp.SeniorityName.SSR')}</option>
                <option value="SSRADV">{translate('gatewayApp.SeniorityName.SSRADV')}</option>
                <option value="SR">{translate('gatewayApp.SeniorityName.SR')}</option>
                <option value="SD">{translate('gatewayApp.SeniorityName.SD')}</option>
                <option value="ARCH">{translate('gatewayApp.SeniorityName.ARCH')}</option>
              </ValidatedField>
              <ValidatedField
                id="seniority-careerProfile"
                name="careerProfileId"
                data-cy="careerProfile"
                label={translate('gatewayApp.apiSeniority.careerProfile')}
                type="select"
                required
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
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/seniority" replace color="info">
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

export default SeniorityUpdate;
