import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/" style={{textDecoration:"none"}}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                        </Link>
                        <Link to="/login" style={{textDecoration:"none"}}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Login</a>
                            </li>
                        </Link>
                        <Link to="/register" style={{textDecoration:"none"}}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Register</a>
                            </li>
                        </Link>
                    </ul>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar