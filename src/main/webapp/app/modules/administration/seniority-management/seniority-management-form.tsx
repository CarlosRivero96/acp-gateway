import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { Translate, byteSize, ValidatedForm, ValidatedField, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUserData, getUserSeniorities, getUserSkills, updateUserData } from './seniority-management.reducer';

import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

export const SeniorityManagementForm = (props: RouteComponentProps<{ login: string }>) => {
  const dispatch = useAppDispatch();
  const userSkillsList = useAppSelector(state => state.seniorityManagement.userSkillsList);
  const userSeniorityList = useAppSelector(state => state.seniorityManagement.userSenioritiesList);
  const userData = useAppSelector(state => state.seniorityManagement.userData);
  const loading = useAppSelector(state => state.userData.loading);
  const updating = useAppSelector(state => state.seniorityManagement.updating);
  const updateSuccess = useAppSelector(state => state.seniorityManagement.updateSuccess);

  useEffect(() => {
    dispatch(getUserData(props.match.params.login));
    dispatch(getUserSkills(props.match.params.login));
    dispatch(getUserSeniorities(props.match.params.login));
  }, []);

  const handleClose = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = seniority => {
    const entity = {
      ...userData,
      ...seniority,
    };

    dispatch(updateUserData(entity));
  };

  const seniorities = ['JR', 'JRADV', 'SSR', 'SSRADV', 'SR', 'SD', 'ARCH'];

  return (
    <Modal isOpen toggle={handleClose} scrollable>
      <ModalHeader>
        <Translate contentKey="gatewayApp.apiUserData.detail.title">User Data</Translate>: {userData.firstName} {userData.lastName}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="10">
            <dl className="jh-entity-details">
              <h3>{userData.careerProfile ? userData.careerProfile.name : ''}</h3>
              <dt>
                <span id="skills">
                  <Translate contentKey="gatewayApp.apiSkill.home.title">Skills</Translate>
                </span>
              </dt>
              <dd>
                {userSkillsList && userSkillsList.length > 0 ? (
                  <Table responsive>
                    <tbody>
                      {userSkillsList
                        .slice()
                        .sort((a, b) => (a.skill.category.name > b.skill.category.name ? 1 : -1))
                        .map((userSkill, i) => (
                          <tr key={`entity-${i}`} data-cy="entityTable">
                            <td>{userSkill.skill ? `${userSkill.skill.category.name} - ${userSkill.skill.name}` : ''}</td>
                            <td>
                              {[1, 2, 3, 4, 5].map(n =>
                                n <= +userSkill.level ? (
                                  <FontAwesomeIcon key={`levelStar-${n}`} color={'#17a2b8'} icon={faStarSolid} />
                                ) : (
                                  <FontAwesomeIcon key={`levelStar-${n}`} color={'#17a2b8'} icon={faStarOutline} />
                                )
                              )}
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
              </dd>
              <dt>
                <Translate contentKey="gatewayApp.apiSeniority.meetsRequirements">Meets requirements for</Translate>
              </dt>
              <dd>
                {userSeniorityList && userSeniorityList.length > 0 ? (
                  <div>
                    {userSeniorityList.map((userSeniority, i) => (
                      <span key={`seniority-${i}`}>{(i ? ', ' : '') + userSeniority.name}</span>
                    ))}
                  </div>
                ) : (
                  'N/A'
                )}
              </dd>
            </dl>
            <ValidatedForm defaultValues={userData} onSubmit={saveEntity}>
              <ValidatedField name="seniority" data-cy="seniority" label={translate('gatewayApp.apiUserData.seniority')} type="select">
                <option value="" key="" />
                {seniorities.map(s => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </ValidatedField>
              <Button color="info" data-cy="entityDetailsBackButton" onClick={() => props.history.goBack()} style={{ margin: '5px' }}>
                <FontAwesomeIcon icon="arrow-left" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default SeniorityManagementForm;
