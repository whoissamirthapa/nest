import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ToggleLikeCommand } from "../command/like.command";
import { LikeService } from "../like.service";
import { GetLikeQuery } from "../queries/like.query";



@CommandHandler(ToggleLikeCommand)
export class ToggleLikeHandler implements ICommandHandler<ToggleLikeCommand>{
    constructor(
        private readonly likeService: LikeService
    ){}
    async execute(command: ToggleLikeCommand): Promise<any> {
        console.log(command?.article_id);
        return this.likeService.toggleLike(command?.article_id, {user_id: command?.data.user_id, reaction: command?.data?.react})
    }
}

@QueryHandler(GetLikeQuery)
export class GetLikeHandler implements IQueryHandler<GetLikeQuery>{
    constructor(
        private readonly likeService: LikeService
    ){}
    async execute(command: GetLikeQuery): Promise<any> {
        console.log(command?.article_id);
        return this.likeService.getLike(command?.article_id);
    }
}