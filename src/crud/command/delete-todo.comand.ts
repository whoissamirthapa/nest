

export class DeleteTodoCommand{
    constructor(
        public readonly id: number
    ){}
}

export class DeleteManyTodoCommand{
    constructor(
        public readonly id: string[]
    ){}
}