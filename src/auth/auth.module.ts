import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./auth.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AddAuthHandler, GetAuthHandler, LoginAuthHandler } from "./handler/auth-handler";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[CqrsModule,
        JwtModule.register({
            secret: 'fagalsiefasldfkansodifansoif',
            signOptions: { expiresIn: '10d' },
          }),
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema}])],
    controllers: [AuthController],
    providers:[
        AuthService,
        AddAuthHandler,
        LoginAuthHandler,
        GetAuthHandler
    ]
})
export class AuthModule{}