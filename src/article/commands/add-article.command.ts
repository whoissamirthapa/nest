

export class AddArticleCommand{
    constructor(
        public readonly data: {
           author: string,
           description: string,
           title: string,
        }
    ){}
}