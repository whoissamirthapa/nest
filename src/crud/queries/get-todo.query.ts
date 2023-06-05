
export class GetTodoQuery{
    constructor(){}
}

export class GetTodoPaginationQuery{
    constructor(
        public readonly page_number: number
    ){}
}

export class GetTodoOnlyQuery{
    constructor(
        public readonly page_number: number
    ){}
}

export class GetTodoProgressQuery{
    constructor(
        public readonly page_number: number
    ){}
}

export class GetTodoCompletedQuery{
    constructor(
        public readonly page_number: number
    ){}
}