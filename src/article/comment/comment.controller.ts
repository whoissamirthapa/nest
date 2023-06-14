import { UseGuards, Get, Param, Query, Delete, Put, Body } from '@nestjs/common';
import { Controller, Req, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/middleware/roles.guard';
import { AddCommentCommand, DeleteCommentCommand, UpdateCommentCommand } from './command/add-comment.command';
import { resErrMessage } from 'src/utils/response';
import { GetCommentQuery } from './queries/get-comment.query';


@Controller("comment")
export class CommentController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}
    
    @Post()
    @UseGuards(RolesGuard)
    addComment(@Req() req: any | Request){
        const { body }  = req;
        const user = req.user;
        if(!user) return resErrMessage({ devError: "User is not loggedin", error: "Something went wrong"});
        return this.commandBus.execute(new AddCommentCommand(body?.article_id, user?._id, body?.comment));
    }

    @Get(":id")
    @UseGuards(RolesGuard)
    getComment(@Param("id") param: string){
        return this.queryBus.execute(new GetCommentQuery(param));
    }

    @Delete(":id")
    @UseGuards(RolesGuard)
    deleteComment(@Param("id") param: string, @Query("comment") comment_id: string,  @Req() req: any | Request){
        console.log(comment_id);
        const user = req.user as any;
        return this.commandBus.execute(new DeleteCommentCommand(param, comment_id, user));
    }

    @Put(":id")
    @UseGuards(RolesGuard)
    updateComment(@Param("id") param: string, @Body() body: any,  @Req() req: any | Request){
        console.log(body);
        const user = req.user as any;
        return this.commandBus.execute(new UpdateCommentCommand(param, body?.comment_id, body?.comment, user));
    }
}