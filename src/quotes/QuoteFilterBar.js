export const QuoteFilterBar = ({ setShowHappyOnly, setShowSadOnly, setShowStressedOnly, setShowAfraidOnly, setShowAngryOnly, setShowAll }) => {
    return (
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
                onClick={() => setShowAll()}
            >
                Show All
            </button>
        </div>
    )
}