import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllJokes } from "../services/jokeService"
import { getAllQuotes } from "../services/quoteServices"


export const QuoteDetails = () => {
    const [quotes, setQuotes] = useState({})
    const { quoteId } = useParams()


useEffect(() => {
    getAllQuotes(quoteId).then((data) => {
        const quoteObj = data[0]
        setQuotes(quoteObj)
    }
    )
}, [quoteId]
)

return <section className="quotes">
    <header className="quotes-header">{quotes.quote} -{quotes.author}</header>
    <div>
        <span className="quotes-info">Added by{quotes.user?.name}:</span>
        
    </div>
</section>

}