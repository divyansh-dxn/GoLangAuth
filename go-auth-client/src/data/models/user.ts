export interface RegisterUserDto {
    name: string,
    email: string,
    password: string
}

export interface User {
    id: string,
    name: string,
    email: string,
}

export interface LoginUserDto {
    email: string,
    password: string
}