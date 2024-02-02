import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllJokes } from "../services/jokeService"


export const JokeDetails = () => {
    const [jokes, setJokes] = useState({})
    const { jokeId } = useParams()


useEffect(() => {
    getAllJokes(jokeId).then((data) => {
        const jokeObj = data[0]
        setJokes(jokeObj)
    }
    )
}, [jokeId]
)

return <section className="jokes">
    <header className="jokes-header">{jokes.joke}</header>
    <div>
        <span className="jokes-info">Added by{jokes.user?.name}:</span>
        
    </div>
</section>

}