import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Reaction, ReactionSchema } from "./like.schema";
import { LikeService } from "./like.service";
import { GetLikeHandler, ToggleLikeHandler } from "./handler/toggle-like.hander";
import { RolesGuard } from "src/auth/middleware/roles.guard";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports: [CqrsModule, MongooseModule.forFeature([{name: Reaction.name, schema: ReactionSchema}])],
    controllers:[LikeController],
    providers: [
        RolesGuard,
        JwtService,
        LikeService,
        ToggleLikeHandler,
        GetLikeHandler
    ],
})

export class LikeModule{}