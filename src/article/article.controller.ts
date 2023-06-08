import { Body, Controller, Post, Req, Get, Put, Delete, Param, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddArticleCommand, DeleteArticleCommand, DeleteArticlesCommand, UpdateArticleCommand } from "./commands/add-article.command";
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
            return resErrMessage({devError: "Title is required", error:"Title is required"});
        }
        if(body?.description !== undefined && body?.description?.trim() === ""){
            return resErrMessage({devError: "Description is required", error:"Description is required"});
        }

        if(!req.user){
            return resErrMessage({devError: "User is not logged in/ user can not found", error:"Something went wrong"});
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

    @Put(":id")
    @UseGuards(RolesGuard)
    updateArticle(@Param("id") id: string, @Body() body: any){
        if(!id) return resErrMessage({devError: "Article id is required while updating", error:"Something went wrong"})

        if(body?.title !== undefined  && body?.title?.trim() === ""){
            return resErrMessage({devError: "Title is required", error:"Title is required"});
        }
        if(body?.description !== undefined && body?.description?.trim() === ""){
            return resErrMessage({devError: "Description is required", error:"Description is required"});
        }
        return this.commandBus.execute(new UpdateArticleCommand(id, body));
    }

    @Delete(":id")
    @UseGuards(RolesGuard)
    deleteArticle(@Param("id") id: string){
        if(!id) return resErrMessage({devError: "Article id is required while deleting", error:"Something went wrong"})
        return this.commandBus.execute(new DeleteArticleCommand(id));
    }

    @Delete()
    @UseGuards(RolesGuard)
    deleteArticles(@Body() body: any){
        const { id } = body;
        if(!id || id?.length < 1) return resErrMessage({devError: "Article ids are required while deleting", error:"Something went wrong"})
        return this.commandBus.execute(new DeleteArticlesCommand(id));
    }
}