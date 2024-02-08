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

    const showAllAndFilterByMood = (mood) => {
        // Reset all filter states
        setShowHappyOnly(false);
        setShowSadOnly(false);
        setShowStressedOnly(false);
        setShowAfraidOnly(false);
        setShowAngryOnly(false);
    
        // Apply the desired mood filter
        switch (mood) {
            case 'happy':
                setShowHappyOnly(true);
                break;
            case 'sad':
                setShowSadOnly(true);
                break;
            case 'stressed':
                setShowStressedOnly(true);
                break;
            case 'afraid':
                setShowAfraidOnly(true);
                break;
            case 'angry':
                setShowAngryOnly(true);
                break;
            default:
                // No specific mood filter needed, just show all
                break;
        }
    };
    

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
            onClick={() => showAllAndFilterByMood('happy')}
            >
            Happy
        </button>
        <button  
        className="filter-btn btn warning"  
        onClick={() => showAllAndFilterByMood('sad')}
        >
        Sad
    </button>
    <button  
    className="filter-btn btn danger"  
    onClick={() => showAllAndFilterByMood('stressed')}
>
    Stressed
    </button>
    <button  
        className="filter-btn btn secondary"  
        onClick={() => showAllAndFilterByMood('afraid')}
    >
        Afraid
    </button>
    <button  
        className="filter-btn btn success"  
        onClick={() => showAllAndFilterByMood('angry')}
    >
        Angry
    </button>
    <button  
        className="filter-btn btn info"  
        onClick={() => showAllAndFilterByMood()}
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