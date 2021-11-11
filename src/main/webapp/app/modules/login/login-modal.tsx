/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import { Translate, translate, ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { divide } from 'lodash';
import { GoogleLogin } from 'react-google-login';
import { handleRegister } from '../account/register/register.reducer';
import { useAppSelector, useAppDispatch } from 'app/config/store';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  // Google Login
  const GoogleLoginButton = () => {
    const clientId = '956284171868-2a7rhl7v9cskj6ttr95p6cqkqtive3va.apps.googleusercontent.com';

    const onSuccess = res => {
      console.log('[Login Success] currentUser:', res.profileObj);
      axios.get<boolean>('api/account/' + res.profileObj.email).then(response => {
        console.log('[RESPONSE]:', response);
        if (response.data.valueOf()) {
          props.handleLogin(res.profileObj.email, res.profileObj.email, true);
        } else {
          dispatch(
            handleRegister({
              login: res.profileObj.email,
              email: res.profileObj.email,
              password: res.profileObj.email,
              firstName: res.profileObj.givenName,
              lastName: res.profileObj.familyName,
              langKey: currentLocale,
            })
          );
          console.log('YESSSSSSSSSSSSS');
        }
      });
    };

    const onFailure = res => {
      console.log('[Login failed] res:', res);
    };

    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          style={{}}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  };

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
      <Form onSubmit={handleSubmit(login)}>
        <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose}>
          <Translate contentKey="login.title">Sign in</Translate>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <div style={{ textAlign: 'center' }}>
                <GoogleLoginButton />
                <div className="mt-1">&nbsp;</div>
                <Translate contentKey="login.form.or">OR</Translate>
              </div>
              <ValidatedField
                name="username"
                label={translate('global.form.username.label')}
                placeholder={translate('global.form.username.placeholder')}
                required
                data-cy="username"
                validate={{ required: 'Username cannot be empty!' }}
                register={register}
                error={errors.username}
                isTouched={touchedFields.username}
              />
              <ValidatedField
                name="password"
                type="password"
                label={translate('login.form.password')}
                placeholder={translate('login.form.password.placeholder')}
                required
                data-cy="password"
                validate={{ required: 'Password cannot be empty!' }}
                register={register}
                error={errors.password}
                isTouched={touchedFields.password}
              />
              <ValidatedField
                name="rememberMe"
                type="checkbox"
                check
                label={translate('login.form.rememberme')}
                value={true}
                register={register}
              />
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          <Button color="secondary" onClick={handleClose} tabIndex={1} size="md">
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>{' '}
          <Button color="primary" type="submit" data-cy="submit" size="md">
            <Translate contentKey="login.form.button">Sign in</Translate>
          </Button>
          <div className="mt-1">&nbsp;</div>
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.register.noaccount">You don&apos;t have an account yet?</Translate>
            </span>{' '}
            <Link to="/account/register">
              <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
            </Link>
          </Alert>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Form>
    </Modal>
  );
};

export default LoginModal;
