export const getAllQuotes = () => {
    return fetch(`http://localhost:8088/quotes?_expand=user`).then((res) => 
    res.json()
    )
}

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users").then((res) => res.json());
  }


export const createQuote = (quote) => {
    return fetch(`http://localhost:8088/quotes?_expand=user`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(quote),
    }).then((res) => res.json())
}

export const deleteQuote = (id) => {
    return fetch(`http://localhost:8088/quotes/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
};

export const updateFavoriteQuote = (userId, quoteId, addFavorite = true) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favoriteQuoteId: addFavorite ? quoteId : null }),
    }).then((res) => res.json());
};