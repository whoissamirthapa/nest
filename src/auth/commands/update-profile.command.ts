export class UpdateUserCommand{
    constructor(
        public readonly id: string,
        public readonly path: string,
        public readonly data: {
            first_name: string,
            last_name: string,
            email: string,
            roles: string[]
        }
    ){}
}