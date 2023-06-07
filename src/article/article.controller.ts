import { Body, Controller, Post, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddArticleCommand } from "./commands/add-article.command";
import { resErrMessage } from "src/utils/response";
import { Request } from "express";



@Controller("article")
export class ArticleController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async addArticle(@Body() body: {title:string, description: string}, @Req() req: Request){
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
        return this.commandBus.execute(new AddArticleCommand(
            { 
                author: token, 
                title: body?.title, 
                description: 
                body.description
            })
        );
    }
}