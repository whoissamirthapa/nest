

export class ToggleLikeCommand{
    constructor(

        public readonly article_id: string,
        public readonly data: {
            user_id: string,
            react: string,
        }
    ){}
}