import React, {SyntheticEvent, useState} from "react";
import {login} from "../helpers/authHelpers";
import {LoginUserDto} from "../data/models/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const user: LoginUserDto = {email, password}
        login(user).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <main className={`mx-auto col-4 form-signin mt-5`}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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

export default Login

