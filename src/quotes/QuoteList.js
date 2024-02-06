import { useEffect, useState } from "react"
import { deleteQuote, getAllQuotes, updateFavoriteQuote } from "../services/quoteServices"

export const QuoteList = () => {
    const [quotes, setQuotes] = useState([])
    const [showHappyOnly, setShowHappyOnly] = useState(false)
    const [showSadOnly, setShowSadOnly] = useState(false)
    const [showStressedOnly, setShowStressedOnly] = useState(false)
    const [showAfraidOnly, setShowAfraidOnly] = useState(false)
    const [showAngryOnly, setShowAngryOnly] = useState(false)
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
        getAllQuotes().then((quotesArray) => {
            setQuotes(quotesArray)
        })
    }, [])

    const handleDelete = async (id) => {
        await deleteQuote(id);
        setQuotes(quotes.filter(quote => quote.id !== id));
    };

    const showAll = () => {
        setShowHappyOnly(false)
        setShowSadOnly(false)
        setShowStressedOnly(false)
        setShowAfraidOnly(false)
        setShowAngryOnly(false)
    }

    const handleFavorite = async (userId, quoteId) => {
        const isFavorite = favorites.has(quoteId);
            if (isFavorite) {
            favorites.delete(quoteId);
        } else {
            favorites.add(quoteId);
        }
        
        await updateFavoriteQuote(userId, quoteId, !isFavorite);
        setFavorites(new Set(favorites));
    };
    


    return (
        <div>
            <div className="filter-bar">
                <button 
                    className="filter-btn btn primary" 
                    onClick={() => setShowHappyOnly(true)}
                >
                    Happy
                </button>
                <button 
                    className="filter-btn btn warning" 
                    onClick={() => setShowSadOnly(true)}
                >
                    Sad
                </button>
                <button 
                    className="filter-btn btn danger" 
                    onClick={() => setShowStressedOnly(true)}
                >
                    Stressed
                </button>
                <button 
                    className="filter-btn btn secondary" 
                    onClick={() => setShowAfraidOnly(true)}
                >
                    Afraid
                </button>
                <button 
                    className="filter-btn btn success" 
                    onClick={() => setShowAngryOnly(true)}
                >
                    Angry
                </button>
                <button 
                    className="filter-btn btn info" 
                    onClick={showAll}
                >
                    Show All
                </button>
            </div>
            <div className="quotes">
                {quotes.map(quoteObj => {
                    if ((showHappyOnly && quoteObj.mood !== 'happy') ||
                        (showSadOnly && quoteObj.mood !== 'sad') ||
                        (showStressedOnly && quoteObj.mood !== 'stressed') ||
                        (showAfraidOnly && quoteObj.mood !== 'afraid') ||
                        (showAngryOnly && quoteObj.mood !== 'angry')) {
                        return null
                    }

                    return (
                        <div key={quoteObj.id}>
                            <h2>{quoteObj.quote}</h2>
                            <h3>-{quoteObj.author}</h3>
                            <p>Added by: {quoteObj.user?.name}</p>
                            <button onClick={() => handleFavorite(currentUserId, quoteObj.id)}>
                            {favorites.has(quoteObj.id) ? 'Favorited' : 'Favorite'}
                            </button>
                            <button onClick={() => handleDelete(quoteObj.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}