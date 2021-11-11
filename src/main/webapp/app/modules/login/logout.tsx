import React, { useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';
import { useGoogleLogout } from 'react-google-login';

export const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();
  const clientId = '956284171868-2a7rhl7v9cskj6ttr95p6cqkqtive3va.apps.googleusercontent.com';
  const { signOut } = useGoogleLogout({
    clientId,
  });

  useLayoutEffect(() => {
    dispatch(logout());
    signOut();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  });

  return (
    <div className="p-5">
      <h4>Logged out successfully!</h4>
    </div>
  );
};

export default Logout;
