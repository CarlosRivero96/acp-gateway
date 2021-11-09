/* eslint-disable no-console */
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = '956284171868-2a7rhl7v9cskj6ttr95p6cqkqtive3va.apps.googleusercontent.com';

export const GoogleLoginButton = () => {
  const onSuccess = res => {
    console.log('[Login Success] currentUser:', res.profileObj);
    console.log(res);
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
        style={{ marginTop: '100px' }}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export const GoogleLogoutButton = () => {
  const onSuccess = () => {
    alert('logout made successfully!');
  };

  const onFailure = () => {
    console.log('[Logout failed]');
  };

  return (
    <div>
      <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess} onFailure={onFailure} />
    </div>
  );
};
