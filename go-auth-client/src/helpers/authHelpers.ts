import {LoginUserDto, RegisterUserDto} from "../data/models/user";

export const login = async (loginUserDto: LoginUserDto) => {
    const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify(loginUserDto),
        headers: {"Content-type": "application/json","withCredentials":"true"}
    })
    return response.json()
}

export const registerUser = async (user: RegisterUserDto) => {
    const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    })
    return response.json()
}

export const logout = async () => {
    const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
    })
    return response.json()
}

export const isLoggedIn = async () => {

}