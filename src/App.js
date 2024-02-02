import logo from './logo.svg';
import { Outlet, Route, Routes } from "react-router-dom"
import './App.css';
import { Welcome } from './welcome/Welcome';
import { NavBar } from './navbar/Navbar';
import { JokeList } from './jokes/JokeList';
import { JokeDetails } from './jokes/JokesDetails';
import { QuoteList } from './quotes/QuoteList';
import { QuoteDetails } from './quotes/QuoteDetails';

export const App = () => {
  return (
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
                
      </Route>
      </Routes>
  )
}