import React, {SyntheticEvent, useState} from "react";
import {RegisterUserDto} from "../data/models/user";
import {registerUser} from "../helpers/authHelpers";


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const user : RegisterUserDto = {name,email,password}
        registerUser(user).then( res => {
            console.log(res)
        })
    }

    return (
        <main className={`mx-auto col-4 form-signin mt-5`}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Register to continue</h1>
                <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingName" placeholder="name"
                           onChange={e => setName(e.target.value)}/>
                    <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating my-3">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating my-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" onClick={handleSubmit}>Sign in</button>
            </form>
        </main>
    )
}

export default Register

