import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetArticlesQuery } from "../queries/get-article.query";
import { ArticleService } from "../article.service";


@QueryHandler(GetArticlesQuery)
export class GetArticlesHandler implements IQueryHandler<GetArticlesQuery>{
    constructor(
        private readonly articleService: ArticleService
    ){}
    execute(query: GetArticlesQuery): Promise<any> {
        return this.articleService.getArticles();
    }
    
}