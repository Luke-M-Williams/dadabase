
export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes?_expand=user").then((res) => 
    res.json()
    )
}
export const createJoke = (joke) => {
    return fetch(`http://localhost:8088/jokes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(joke),
    }).then((res) => res.json())
}