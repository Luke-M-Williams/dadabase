import { useEffect, useState } from "react"
import { getAllJokes } from "../services/jokeService"
import { Link } from "react-router-dom"



export const JokeList = () => {
    const [jokes, setJokes] = useState([])

    useEffect(() => {
        getAllJokes().then((jokesArray) => {
            setJokes(jokesArray)
        })
    }, [])

    return (
            <div className="jokes">
            {jokes.map(jokeObj => {
                return (
                    <div key={jokeObj.id}>
                        <h2>{jokeObj.joke}</h2>
                        <p>Added by: {jokeObj.user?.name}</p>
                       </div>
                )
            })}
        </div>
    )
}