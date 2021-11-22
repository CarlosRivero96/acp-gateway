import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getMission } from './missions.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const MissionsDetail = (props: RouteComponentProps<{ id: string; category: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMission(props.match.params.id));
  }, []);

  const handleClose = () => {
    props.history.goBack();
  };

  const missionEntity = useAppSelector(state => state.missions.entity);

  // let actionButton = <></>;
  // if (props.match.params.category === "1") {
  //   actionButton =
  //     <Button replace color="warning" data-cy="takeMissionButton" onClick={() => }>

  //     </Button>;
  // } else if (props.match.params.category === "2") {
  //   actionButton =
  //     <>
  //       <Button>

  //       </Button>
  //       <Button>

  //       </Button>
  //     </>
  // } else if (props.match.params.category === "3") {
  //   actionButton = <></>;
  // }

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader>
        <h2 data-cy="missionDetailsHeading">
          <Translate contentKey="gatewayApp.apiMission.detail.title">Mission</Translate>: {missionEntity.name}
        </h2>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="8">
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
            <Button replace color="info" data-cy="entityDetailsBackButton" onClick={() => props.history.goBack()}>
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default MissionsDetail;
