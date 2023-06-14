

export class AddCommentCommand{
    constructor(
        public readonly article_id: string,
        public readonly user_id: string,
        public readonly comment: string,
    ){}
}

export class DeleteCommentCommand{
    constructor(
        public readonly id: string,
        public readonly comment_id: string,
        public readonly user: any,
    ){}
}