
export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes?_expand=user").then((res) => 
    res.json()
    )
}

export const getAllUsers = () => {
    return fetch("http://localhost:8088/users").then((res) => res.json());
  }


export const createJoke = (joke) => {
    return fetch(`http://localhost:8088/jokes?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    }).then((res) => res.json());
  };


export const deleteJoke = (id) => {
    return fetch(`http://localhost:8088/jokes/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
};

export const updateFavoriteJoke = (userId, jokeId, addFavorite = true) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favoriteJokeId: addFavorite ? jokeId : null }),
    }).then((res) => res.json());
};