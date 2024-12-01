import React, { useEffect, useState } from 'react';
import { db, auth } from '../services/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Track user authentication state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const spotifyToken = userData.spotifyToken;
            if (spotifyToken) {
              setToken(spotifyToken);
            } else {
              setError('No Spotify token found in Firestore.');
            }
          } else {
            setError('User data not found.');
          }
        } catch (err) {
          setError('Error fetching user data from Firestore: ' + err.message);
        }
      } else {
        setError('User not authenticated.');
      }
    };

    if (user) {
      fetchSpotifyToken();
    }
  }, [user]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }

        const data = await response.json();
        setPlaylists(data.items || []);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {playlist.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
