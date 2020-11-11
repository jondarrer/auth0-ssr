import React from 'react';
import { IconButton, Spinner } from 'theme-ui';

// import UnlockIcon from '../../images/unlock.svg';
import UserIcon from '../../images/user.svg';

// const LoginButton = ({ onClickHandler }) => (
//   <IconButton onClick={() => onClickHandler()} aria-label="Login">
//     <UnlockIcon width="20px" height="20px" fill="currentcolor" />
//   </IconButton>
// );
const LogoutButton = ({ onClickHandler, returnTo }) => (
  <IconButton onClick={() => onClickHandler({ returnTo })} aria-label="Logout">
    <UserIcon width="20px" height="20px" fill="currentcolor" />
  </IconButton>
);

const LoginLogoutButton = ({ logoutReturnTo }) => {
  return (
    <LogoutButton onClickHandler={console.log} returnTo={logoutReturnTo} />
  );
};

export default LoginLogoutButton;
