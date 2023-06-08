import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddArticleCommand, DeleteArticleCommand, DeleteArticlesCommand, UpdateArticleCommand } from "../commands/add-article.command";
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
@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler implements ICommandHandler<UpdateArticleCommand>{

    constructor(
        private readonly articleService: ArticleService
    ){}
    async execute(command: UpdateArticleCommand): Promise<any> {
        return this.articleService.updateArticle(command?.id, command?.data);
    }
    
}

@CommandHandler(DeleteArticleCommand)
export class DeleteArticleHandler implements ICommandHandler<DeleteArticleCommand>{

    constructor(
        private readonly articleService: ArticleService
    ){}
    async execute(command: DeleteArticleCommand): Promise<any> {
        return this.articleService.deleteArticle(command?.id);
    }
    
}

@CommandHandler(DeleteArticlesCommand)
export class DeleteArticlesHandler implements ICommandHandler<DeleteArticlesCommand>{

    constructor(
        private readonly articleService: ArticleService
    ){}
    async execute(command: DeleteArticlesCommand): Promise<any> {
        return this.articleService.deleteArticles(command?.id);
    }
    
}