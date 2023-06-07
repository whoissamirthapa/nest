import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddArticleCommand } from "../commands/add-article.command";
import { ArticleService } from "../article.service";


@CommandHandler(AddArticleCommand)
export class AddArticleHandler implements ICommandHandler<AddArticleCommand>{

    constructor(
        private readonly articleService: ArticleService
    ){}
    async execute(command: AddArticleCommand): Promise<any> {
        return this.articleService.addArticle(command?.data);
    }
    
}