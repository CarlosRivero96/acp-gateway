import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons';

import { getMission, startMission, completeMission, cancelMission } from './missions.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const MissionsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();
  const missionEntity = useAppSelector(state => state.missions.entity);
  const activeTab = useAppSelector(state => state.missions.activeTab);

  useEffect(() => {
    dispatch(getMission(props.match.params.id));
  }, []);

  const handleClose = () => {
    props.history.goBack();
  };

  const takeMission = () => {
    dispatch(startMission(missionEntity));
    handleClose();
  };

  const finishMission = () => {
    dispatch(completeMission(missionEntity));
    handleClose();
  };

  const stopMission = () => {
    dispatch(cancelMission(missionEntity));
    handleClose();
  };

  let actionButton = <></>;
  if (activeTab === '1') {
    actionButton = (
      <Button color="warning" data-cy="takeMissionButton" onClick={takeMission} style={{ margin: '5px' }}>
        <FontAwesomeIcon icon={faPlus} />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.startmission">Start</Translate>
        </span>
      </Button>
    );
  } else if (activeTab === '2') {
    actionButton = (
      <>
        <Button color="danger" data-cy="takeMissionButton" onClick={stopMission} style={{ margin: '5px' }}>
          <FontAwesomeIcon icon={faMinus} />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.cancelmission">Cancel</Translate>
          </span>
        </Button>
        <Button color="success" data-cy="completeMissionButton" onClick={finishMission} style={{ margin: '5px' }}>
          <FontAwesomeIcon icon={faCheck} />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.completemission">Complete</Translate>
          </span>
        </Button>
      </>
    );
  }

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader>
        <Translate contentKey="gatewayApp.apiMission.detail.title">Mission</Translate>: {missionEntity.name}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="10">
            <dl className="jh-entity-details">
              <dt>
                <span id="requirement">
                  <Translate contentKey="gatewayApp.apiMission.requirement">Requirement</Translate>
                </span>
              </dt>
              <dd>{`${missionEntity.skill ? missionEntity.skill.name : ''}: ${missionEntity.levelRequired}`}</dd>
              <dt>
                <span id="description">
                  <Translate contentKey="gatewayApp.apiMission.description">Description</Translate>
                </span>
              </dt>
              <dd>{missionEntity.description}</dd>
            </dl>
            <Button color="info" data-cy="entityDetailsBackButton" onClick={() => props.history.goBack()} style={{ margin: '5px' }}>
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            {actionButton}
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default MissionsDetail;
