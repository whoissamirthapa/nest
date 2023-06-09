

export class AddCommentCommand{
    constructor(
        public readonly article_id: string,
        public readonly user_id: string,
        public readonly comment: string,
    ){}
}