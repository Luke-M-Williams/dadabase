import { useEffect, useState } from "react";
import { getAllJokes, deleteJoke, updateFavoriteJoke } from "../services/jokeService";
import "./Jokes.css"

export const JokeList = () => {
    const [jokes, setJokes] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const storedUser = localStorage.getItem("dadabase_user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUserId(parsedUser.id);
        }
      }, []);

    useEffect(() => {
        getAllJokes().then((jokesArray) => {
            setJokes(jokesArray);
        });
    }, []);


    const handleDelete = async (id) => {
        await deleteJoke(id);
        setJokes(jokes.filter(joke => joke.id !== id));
    };

    const handleFavorite = async (userId, jokeId) => {
        const isFavorite = favorites.has(jokeId);
            if (isFavorite) {
            favorites.delete(jokeId);
        } else {
            favorites.add(jokeId);
        }
        
        await updateFavoriteJoke(userId, jokeId, !isFavorite);
        setFavorites(new Set(favorites));
    };
    

    return (
        <div className="jokes">
            <div className="jokes-header"><h1>DAD JOKES</h1></div>
            {jokes.map(jokeObj => {
                return (
                    <div key={jokeObj.id}>
                        <h2>{jokeObj.joke}</h2>
                        <p>Added by: {jokeObj.user?.name}</p>
                        <button onClick={() => handleFavorite(currentUserId, jokeObj.id)}>
                            {favorites.has(jokeObj.id) ? 'Favorited' : 'Favorite'}
                        </button>
                        <button onClick={() => handleDelete(jokeObj.id)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};
