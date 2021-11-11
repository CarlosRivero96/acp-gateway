import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUserData } from 'app/shared/model/api/user-data.model';
import { getEntities as getUserData } from 'app/entities/api/user-data/user-data.reducer';
import { ISkill } from 'app/shared/model/api/skill.model';
import { getEntities as getSkills } from 'app/entities/api/skill/skill.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-skill.reducer';
import { IUserSkill } from 'app/shared/model/api/user-skill.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserSkillUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const userData = useAppSelector(state => state.userData.entities);
  const skills = useAppSelector(state => state.skill.entities);
  const userSkillEntity = useAppSelector(state => state.userSkill.entity);
  const loading = useAppSelector(state => state.userSkill.loading);
  const updating = useAppSelector(state => state.userSkill.updating);
  const updateSuccess = useAppSelector(state => state.userSkill.updateSuccess);

  const handleClose = () => {
    props.history.push('/user-skill');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUserData({}));
    dispatch(getSkills({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...userSkillEntity,
      ...values,
      user: userData.find(it => it.id.toString() === values.userId.toString()),
      skill: skills.find(it => it.id.toString() === values.skillId.toString()),
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
          ...userSkillEntity,
          userId: userSkillEntity?.user?.id,
          skillId: userSkillEntity?.skill?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiUserSkill.home.createOrEditLabel" data-cy="UserSkillCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiUserSkill.home.createOrEditLabel">Create or edit a UserSkill</Translate>
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
                  id="user-skill-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.apiUserSkill.level')}
                id="user-skill-level"
                name="level"
                data-cy="level"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="user-skill-user"
                name="userId"
                data-cy="user"
                label={translate('gatewayApp.apiUserSkill.user')}
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
                id="user-skill-skill"
                name="skillId"
                data-cy="skill"
                label={translate('gatewayApp.apiUserSkill.skill')}
                type="select"
                required
              >
                <option value="" key="0" />
                {skills
                  ? skills.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-skill" replace color="info">
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

export default UserSkillUpdate;
