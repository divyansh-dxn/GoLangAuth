import React from 'react';
import Login from './pages/Login';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar/>
                <Route path={`/`} exact component={Home}/>
                <Route path={`/login`} exact component={Login}/>
                <Route path={`/register`} exact component={Register}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
