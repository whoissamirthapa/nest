import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AddCommentCommand } from "../command/add-comment.command";
import { CommentService } from "../comment.service";
import { GetCommentQuery } from "../queries/get-comment.query";



@CommandHandler(AddCommentCommand)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand>{
    constructor(
        private readonly commentService: CommentService
    ){}
    async execute(command: AddCommentCommand): Promise<any> {
        return this.commentService.addComment(command?.article_id, command?.user_id, command?.comment);
    }
}

@QueryHandler(GetCommentQuery)
export class GetCommentHandler implements IQueryHandler<GetCommentQuery>{
    constructor(
        private readonly commentService: CommentService
    ){}
    async execute(query: GetCommentQuery): Promise<any> {
        return this.commentService.getComment(query?.comment_id);
    }
}