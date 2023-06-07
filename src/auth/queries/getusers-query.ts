

export class GetUsersQuery{
    constructor(){}
}

export class GetProfileQuery{
    constructor(
        public readonly id: string
    ){}
}