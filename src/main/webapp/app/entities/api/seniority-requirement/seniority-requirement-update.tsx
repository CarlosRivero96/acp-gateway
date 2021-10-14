import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISkill } from 'app/shared/model/api/skill.model';
import { getEntities as getSkills } from 'app/entities/api/skill/skill.reducer';
import { ISeniority } from 'app/shared/model/api/seniority.model';
import { getEntities as getSeniorities } from 'app/entities/api/seniority/seniority.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seniority-requirement.reducer';
import { ISeniorityRequirement } from 'app/shared/model/api/seniority-requirement.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SeniorityRequirementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const skills = useAppSelector(state => state.skill.entities);
  const seniorities = useAppSelector(state => state.seniority.entities);
  const seniorityRequirementEntity = useAppSelector(state => state.seniorityRequirement.entity);
  const loading = useAppSelector(state => state.seniorityRequirement.loading);
  const updating = useAppSelector(state => state.seniorityRequirement.updating);
  const updateSuccess = useAppSelector(state => state.seniorityRequirement.updateSuccess);

  const handleClose = () => {
    props.history.push('/seniority-requirement');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSkills({}));
    dispatch(getSeniorities({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...seniorityRequirementEntity,
      ...values,
      skill: skills.find(it => it.id.toString() === values.skillId.toString()),
      seniority: seniorities.find(it => it.id.toString() === values.seniorityId.toString()),
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
          ...seniorityRequirementEntity,
          skillId: seniorityRequirementEntity?.skill?.id,
          seniorityId: seniorityRequirementEntity?.seniority?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.apiSeniorityRequirement.home.createOrEditLabel" data-cy="SeniorityRequirementCreateUpdateHeading">
            <Translate contentKey="gatewayApp.apiSeniorityRequirement.home.createOrEditLabel">
              Create or edit a SeniorityRequirement
            </Translate>
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
                  id="seniority-requirement-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.apiSeniorityRequirement.level')}
                id="seniority-requirement-level"
                name="level"
                data-cy="level"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="seniority-requirement-skill"
                name="skillId"
                data-cy="skill"
                label={translate('gatewayApp.apiSeniorityRequirement.skill')}
                type="select"
                required
              >
                <option value="" key="0" />
                {skills
                  ? skills.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="seniority-requirement-seniority"
                name="seniorityId"
                data-cy="seniority"
                label={translate('gatewayApp.apiSeniorityRequirement.seniority')}
                type="select"
                required
              >
                <option value="" key="0" />
                {seniorities
                  ? seniorities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/seniority-requirement" replace color="info">
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

export default SeniorityRequirementUpdate;
