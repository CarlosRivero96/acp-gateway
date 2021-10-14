import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUserData } from 'app/shared/model/api/user-data.model';
import { getEntities as getUserData } from 'app/entities/api/user-data/user-data.reducer';
import { IMission } from 'app/shared/model/api/mission.model';
import { getEntities as getMissions } from 'app/entities/api/mission/mission.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-mission.reducer';
import { IUserMission } from 'app/shared/model/api/user-mission.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserMissionUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const userData = useAppSelector(state => state.userData.entities);
  const missions = useAppSelector(state => state.mission.entities);
  const userMissionEntity = useAppSelector(state => state.userMission.entity);
  const loading = useAppSelector(state => state.userMission.loading);
  const updating = useAppSelector(state => state.userMission.updating);
  const updateSuccess = useAppSelector(state => state.userMission.updateSuccess);

  const handleClose = () => {
    props.history.push('/user-mission');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUserData({}));
    dispatch(getMissions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...userMissionEntity,
      ...values,
      user: userData.find(it => it.id.toString() === values.userId.toString()),
      mission: missions.find(it => it.id.toString() === values.missionId.toString()),
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
          ...userMissionEntity,
          userId: userMissionEntity?.user?.id,
          missionId: userMissionEntity?.mission?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiUserMission.home.createOrEditLabel" data-cy="UserMissionCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiUserMission.home.createOrEditLabel">Create or edit a UserMission</Translate>
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
                  id="user-mission-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.apiUserMission.completed')}
                id="user-mission-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField
                id="user-mission-user"
                name="userId"
                data-cy="user"
                label={translate('gatewayApp.apiUserMission.user')}
                type="select"
                required
              >
                <option value="" key="0" />
                {userData
                  ? userData.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="user-mission-mission"
                name="missionId"
                data-cy="mission"
                label={translate('gatewayApp.apiUserMission.mission')}
                type="select"
                required
              >
                <option value="" key="0" />
                {missions
                  ? missions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-mission" replace color="info">
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

export default UserMissionUpdate;
