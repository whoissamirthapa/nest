import { Body, Controller, Post, Req, Get, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddArticleCommand } from "./commands/add-article.command";
import { resErrMessage } from "src/utils/response";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/middleware/roles.guard";
import { GetArticlesQuery } from "./queries/get-article.query";



@Controller("article")
export class ArticleController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    @UseGuards(RolesGuard)
    addArticle(@Body() body: {title:string, description: string}, @Req() req: any): any{
        const token = req.headers.authorization?.slice(7,req.headers.authorization?.length);
        if(!token){
            return resErrMessage("User must be logged in");
        }
        if(body?.title !== undefined  && body?.title?.trim() === ""){
            return resErrMessage("Title is required");
        }
        if(body?.description !== undefined && body?.description?.trim() === ""){
            return resErrMessage("Description is required");
        }

        if(!req.user){
            return resErrMessage("Something went wrong");
        }
        return this.commandBus.execute(new AddArticleCommand(
            { 
                author: req?.user?._id, 
                title: body?.title, 
                description: 
                body.description
            })
        );
    }
    
    @Get()
    @UseGuards(RolesGuard)
    getArticles(){
        return this.queryBus.execute(new GetArticlesQuery());
    }

}