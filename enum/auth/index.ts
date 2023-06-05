export type authTypeReq = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export type authTypeRes = {
    first_name: string,
    last_name: string,
    display_name: string,
    email: string,
    password: string,
}

export type loginAuth = {
    email: string,
    password: string,
}