import { Body, Controller, Post, UseGuards, Req, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Roles, RolesGuard } from "src/auth/middleware/roles.guard";
import { ToggleLikeCommand } from "./command/like.command";
import { resErrMessage } from "src/utils/response";
import { GetLikeQuery } from "./queries/like.query";

@Controller("like")
export class LikeController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ){}

    @Post()
    @UseGuards(RolesGuard)
    toggleLike(@Body() body: { article_id: string, react: string}, @Req() req: any){
        const userId = req.user
        if(!userId) return resErrMessage({ devError: "User most loggedin to react", error: "Something went wrong"});
        return this.commandBus.execute(new ToggleLikeCommand(body?.article_id, { user_id: userId?._id, react:body?.react}));
    }

    @Get()
    @UseGuards(RolesGuard)
    getLike(@Body() body: {article_id: string}){
        if(!body?.article_id) return resErrMessage({ devError: "Article must be provided", error: "Something went wrong"});
        return this.queryBus.execute(new GetLikeQuery(body?.article_id));
    }
}