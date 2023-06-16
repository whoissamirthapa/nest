

export class AddCommentCommand{
    constructor(
        public readonly article_id: string,
        public readonly user_id: string,
        public readonly comment: string,
        public readonly parent_id: string,
    ){}
}

export class DeleteCommentCommand{
    constructor(
        public readonly id: string,
        public readonly comment_id: string,
        public readonly user: any,
    ){}
}


export class UpdateCommentCommand{
    constructor(
        public readonly id: string,
        public readonly comment_id: string,
        public readonly comment: string,
        public readonly user: any,
    ){}
}

