import { useEffect, useState } from "react";
import { getAllJokes, deleteJoke } from "../services/jokeService";

export const JokeList = () => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        getAllJokes().then((jokesArray) => {
            setJokes(jokesArray);
        });
    }, []);


    const handleDelete = async (id) => {
        await deleteJoke(id);
        setJokes(jokes.filter(joke => joke.id !== id));
    };

    return (
        <div className="jokes">
            {jokes.map(jokeObj => {
                return (
                    <div key={jokeObj.id}>
                        <h2>{jokeObj.joke}</h2>
                        <p>Added by: {jokeObj.user?.name}</p>
                        <button onClick={() => handleDelete(jokeObj.id)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};