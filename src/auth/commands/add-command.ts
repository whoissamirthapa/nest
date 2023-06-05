

export class AddAuthCommand{
    constructor(
        public readonly data: {
            first_name: string,
            last_name: string,
            email: string,
            password: string,
        }
    ){}
}

export class LoginAuthCommand{
    constructor(
        public readonly data: {
            email: string,
            password: string,
        }
    ){}
}