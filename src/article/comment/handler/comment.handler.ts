import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AddCommentCommand, DeleteCommentCommand, UpdateCommentCommand } from "../command/add-comment.command";
import { CommentService } from "../comment.service";
import { GetCommentQuery } from "../queries/get-comment.query";
import { DeleteArticleCommand } from "src/article/commands/add-article.command";



@CommandHandler(AddCommentCommand)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand>{
    constructor(
        private readonly commentService: CommentService
    ){}
    async execute(command: AddCommentCommand): Promise<any> {
        return this.commentService.addComment(command?.article_id, command?.user_id, command?.comment, command?.parent_id);
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

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements IQueryHandler<DeleteCommentCommand>{
    constructor(
        private readonly commentService: CommentService
    ){}
    async execute(command: DeleteCommentCommand): Promise<any> {
        return this.commentService.deleteComment(command?.id, command?.comment_id, command?.user);
    }
}

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements IQueryHandler<UpdateCommentCommand>{
    constructor(
        private readonly commentService: CommentService
    ){}
    async execute(command: UpdateCommentCommand): Promise<any> {
        return this.commentService.updateComment(command?.id, command?.comment_id, command?.comment, command?.user);
    }
}