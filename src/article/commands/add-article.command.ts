

export class AddArticleCommand{
    constructor(
        public readonly data: {
           author: string,
           description: string,
           title: string,
        }
    ){}
}


export class UpdateArticleCommand{
    constructor(
        public readonly id: string,
        public readonly data: any
    ){}
}

export class DeleteArticleCommand{
    constructor(
        public readonly id: string
    ){}
}

export class DeleteArticlesCommand{
    constructor(
        public readonly id: string[]
    ){}
}