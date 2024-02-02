
export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => 
    res.json()
    )
}

export const createQuote = (joke) => {
    return fetch(`http://localhost:8088/quotes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(joke),
    }).then((res) => res.json())
}