import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/Navbar"
import { Welcome } from "../welcome/Welcome"
import { JokeList } from "../jokes/JokeList"
import { JokeDetails } from "../jokes/JokesDetails"
import { QuoteList } from "../quotes/QuoteList"
import { QuoteDetails } from "../quotes/QuoteDetails"
import { AddJokeForm } from "../jokes/AddJoke"
import { AddQuoteForm } from "../quotes/AddQuote"
import { User } from "../users/Users"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localDadabaseUser = localStorage.getItem("dadabase_user")
        const dadabaseUserObj = JSON.parse(localDadabaseUser)

        setCurrentUser(dadabaseUserObj)
    }, [])

    return(
        <Routes>
            <Route path="/" 
                element={
                    <>
                <NavBar />
                <Outlet />

                    </>
                }
                >
                <Route index element={<Welcome />} />
                <Route path='jokes'>
                  <Route index element={<JokeList />} />
                  <Route path=':jokeId' element={<JokeDetails />} />
                </Route>
                <Route path='quotes'>
                  <Route index element={<QuoteList />} /> 
                  <Route path=':quoteId' element={<QuoteDetails />} />
                </Route>
                <Route path="add/*">
                <Route index element={
                    <>
                    <AddJokeForm />
                    <AddQuoteForm />
                    </>
                } />
                </Route>
                <Route path='user'>
                    <Route index element={<User />} />
                </Route>

                
      </Route>
        </Routes>
    )
}