import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../services/userService';
import './Users.css'

export const User = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [favoriteJoke, setFavoriteJoke] = useState(null);
  const [favoriteQuote, setFavoriteQuote] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("dadabase_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      getUserInfo(parsedUser.id).then((userData) => {
        setCurrentUser(userData);
        // Fetch favorite joke
        fetch(`http://localhost:8088/jokes/${userData.favoriteJokeId}`)
          .then(response => response.json())
          .then(jokeData => setFavoriteJoke(jokeData));
        // Fetch favorite quote
        fetch(`http://localhost:8088/quotes/${userData.favoriteQuoteId}`)
          .then(response => response.json())
          .then(quoteData => setFavoriteQuote(quoteData));
      });
    }
  }, []);

  return (
    <div>
      {currentUser && (
        <div className='user-profile'>
          <h2>Welcome, {currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          {favoriteJoke && (
            <div>
              <h3>Favorite Joke:</h3>
              <p>{favoriteJoke.joke}</p>
            </div>
          )}
          {favoriteQuote && (
            <div>
              <h3>Favorite Quote:</h3>
              <p>{favoriteQuote.quote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};