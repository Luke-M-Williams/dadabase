export const getAllQuotes = () => {
    return fetch(`http://localhost:8088/quotes`).then((res) => 
    res.json()
    )
}

export const createQuote = (quote) => {
    return fetch(`http://localhost:8088/quotes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(quote),
    }).then((res) => res.json())
}