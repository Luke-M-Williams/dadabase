import { useEffect, useState } from 'react';
import { createQuote } from '../services/quoteServices';
import './Quotes.css'

export const AddQuoteForm = () => {
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [mood, setMood] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("dadabase_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUserId(parsedUser.id);
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();



    if (!quoteText || !author || !mood) {
    alert('All fields must be filled out.'); // Replace with your preferred method of displaying errors
    return; // Exit the function early if any field is empty
  }
   
  if (currentUserId) {
    const newQuote = {
      quote: quoteText,
      author: author,
      mood: mood,
      isStarWars: false,
      userId:  currentUserId
    };
    try {
      await createQuote(newQuote);
      setQuoteText('');
      setAuthor('');
      setMood('');
    } catch (error) {
      console.error('Failed to add quote:', error);
    }
  } else {
    console.log('No user is logged in. Please log in to submit a quote');
  }
};

  return (
   <div className='form-container'>
  <form onSubmit={handleSubmit}>
    <label htmlFor="quote-text">Quote Text:</label>
    <input
      id="quote-text"
      type="text"
      placeholder='Quote'
      value={quoteText}
      onChange={(event) => setQuoteText(event.target.value)}
    />
    <br />
    <label htmlFor="author">Author:</label>
    <input
      id="author"
      type="text"
      placeholder='Author'
      value={author}
      onChange={(event) => setAuthor(event.target.value)}
    />
    <br />
    <label htmlFor="mood">Mood:</label>
    <select
      id="mood"
      value={mood}
      onChange={(event) => setMood(event.target.value)}
    >
      <option value="">Select mood</option>
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
      <option value="stressed">Stressed</option>
      <option value="afraid">Afraid</option>
      <option value="angry">Angry</option>
    </select>
    <br />
    <button type="submit">Add Quote</button>
  </form>
</div>
  );
};