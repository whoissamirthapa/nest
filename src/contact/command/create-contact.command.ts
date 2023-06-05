

export class CreateContactCommand {
    constructor(
        public readonly data: {
        name: string,
        count_people: number,
        datetime: Date,
        message: string
        }
    ){}

}

