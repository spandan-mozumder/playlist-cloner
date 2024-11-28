import React from 'react';

const Login = () => {
  const CLIENT_ID = 'a2c209e2781547d38984ca78f4516579';
  const REDIRECT_URI = 'http://localhost:5173/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-email`;

  return (
    <div>
      <h1>Spotify Login</h1>
      <a href={loginUrl}>
        <button>Login to Spotify</button>
      </a>
    </div>
  );
};

export default Login;
