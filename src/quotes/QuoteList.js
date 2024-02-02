import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllQuotes } from "../services/quoteServices"



export const QuoteList = () => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        getAllQuotes().then((quotesArray) => {
            setQuotes(quotesArray)
        })
    }, [])

    return (
            <div className="quotes">
            {quotes.map(quoteObj => {
                return (
                    <div key={quoteObj.id}>
                        <h2>{quoteObj.quote}</h2>
                        <h3>-{quoteObj.author}</h3>
                        <p>Added by: {quoteObj.user?.name}</p>
                       </div>
                )
            })}
        </div>
    )
}