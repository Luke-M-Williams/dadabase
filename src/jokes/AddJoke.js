import { useEffect, useState } from 'react';
import { createJoke } from '../services/jokeService';
import "./Jokes.css"

export const AddJokeForm = () => {
  const [newJokeText, setNewJokeText] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  // Load the current user ID from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("dadabase_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUserId(parsedUser.id);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentUserId) {
      const newJoke = {
        joke: newJokeText,
        userId: currentUserId
      };
      try {
        await createJoke(newJoke);
        setNewJokeText('');
      } catch (error) {
        console.error('Error adding joke:', error);
      }
    } else {
      console.log('No user is logged in. Please log in to submit a joke.');
    }
  };

  return (
    <div className='add-joke-form'>
<form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
  <label htmlFor="quote-text">Joke:</label>
  <input
    type="text"
    placeholder="Add your joke here..."
    value={newJokeText}
    onChange={(e) => setNewJokeText(e.target.value)}
    style={{ width: '80%', maxWidth: '500px', padding: '8px' }}
  />
  <br />
  <button type="submit">Add Joke</button>
</form>
</div>
 )
}