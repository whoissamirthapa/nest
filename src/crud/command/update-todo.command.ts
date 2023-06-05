

export class EditTodoCommand{
    constructor(
        public readonly id: number,
        public readonly data: any
    ){}
}

export class EditTodoCommandProgress{
    constructor(
        public readonly id: any[],
        public readonly data: any,
    ){}
}