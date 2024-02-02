import logo from './logo.svg';
import { Outlet, Route, Routes } from "react-router-dom"
import './App.css';
import { Welcome } from './welcome/Welcome';
import { NavBar } from './navbar/Navbar';

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
      </Route>
      </Routes>
  )
}