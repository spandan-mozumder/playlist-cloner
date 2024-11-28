import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "390879490722-ipf8n56nlfdggd60rgfas4qfk8r51por.apps.googleusercontent.com";
const API_KEY = "AIzaSyBx_yRaYrG9rMUd_9OwxHIneXL1U6emwx8";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

function YouTubePlaylists() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    function initializeGapiClient() {
      gapi.load("client:auth2", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());

        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    }

    initializeGapiClient();
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const fetchPlaylists = async () => {
    try {
      const response = await gapi.client.youtube.playlists.list({
        part: "snippet",
        mine: true,
      });
      setPlaylists(response.result.items);
    } catch (error) {
      console.error("Error fetching playlists", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchPlaylists();
    }
  }, [isSignedIn]);

  return (
    <div>
      <h1>YouTube Playlists</h1>
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign In</button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}

      {isSignedIn && (
        <div>
          <h2>Your Playlists:</h2>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <img
                  src={playlist.snippet.thumbnails.default.url}
                  alt={playlist.snippet.title}
                />
                <p>{playlist.snippet.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default YouTubePlaylists;
