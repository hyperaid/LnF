import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { sendAuthorizationCode } from '../Api/Data';
import { UserContext } from '../utils/UserContext';
import { Navigate } from 'react-router-dom';

const GoogleLogin = () => {
  const [, setUser] = React.useContext(UserContext);
  
  useEffect(() => {
    login()
      .then((userData) => {
        if (userData && userData.email) {
          // Check if the email ends with "@iiitbh.ac.in"
          if (userData.email.endsWith('@iiitbh.ac.in')) {
            // Email is valid, proceed
            if (userData.hallNumber) {
              window.location.assign('/');
            } else {
              window.location.assign('/dashboard');
            }
            console.log('logged in');
          } else {
            // Email is invalid, show a pop-up message
            alert('You are not authorized to access. Please use your @iiitbh.ac.in email.');
            window.location.assign('/');  
          }
        } else {
          console.error('User data is not available');

        }
      })
      .catch((error) => {
        console.error('Error during login', error);
        alert('Login failed');
      });
  }, []);

  const login = async () => {
    const url = new URLSearchParams(new URL(window.location.href).search);
    const state = localStorage.getItem('state');
    if (state !== url.get('state')) {
      console.error('state mismatch');
    }
    return await sendAuthorizationCode(url.get('code'), setUser);
  };

  return (<>
    <div style={{
      height: '76vh',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <CircularProgress />
      <h1>Please Wait while we verify you</h1>
    </div>
  </>);
};

export default GoogleLogin;
