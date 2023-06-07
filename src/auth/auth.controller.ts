import { 
    Body, 
    Controller, 
    Post, 
    UseGuards, 
    Request, 
    Get, 
    Param, 
    Put, 
    UploadedFile, 
    UseInterceptors,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { authTypeReq } from "enum/auth";
import { AddAuthCommand, LoginAuthCommand } from "./commands/add-command";
import { GetProfileQuery, GetUsersQuery } from "./queries/getusers-query";
import { Roles, RolesGuard } from "./middleware/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from "multer";
import * as path from "path";
import { UpdateUserCommand } from "./commands/update-profile.command";
import { cloudinaryInstance } from "./middleware/cloudinary";


@Controller("auth")
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post("register")
    async register(@Body() body: authTypeReq){
        return this.commandBus.execute(new AddAuthCommand(body));
    }

    @Post('login')
    async login(@Request() req: any) {
        return this.commandBus.execute(new LoginAuthCommand( req.body))
    }

    @Get()
    @Roles("Admin")
    @UseGuards(RolesGuard)
    async getUsers(){
        return this.queryBus.execute(new GetUsersQuery())
    }

    @Get(":id")
    @Roles("Admin","User")
    @UseGuards(RolesGuard)
    async getUser(@Param("id") id: string){
        console.log(id)
        return this.queryBus.execute(new GetProfileQuery(id))
    }

    @Put(":id")
    @Roles("Admin", "User")
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './public/image',
          filename: (req, file, cb) => {
            const uniqueSuffix = uuidv4();
            const fileExtension = path.extname(file.originalname);
            const fileName = `${uniqueSuffix}${fileExtension}`;
            cb(null, fileName);
          },
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png'];
            const allowedSize = 1 * 1024 * 1024; // 1 MB
    
            if (!allowedMimeTypes.includes(file.mimetype)) {
              cb(new Error('Invalid file type'), false);
            } else if (file.size > allowedSize) {
              cb(new Error('File size exceeds the limit'), false);
            } else {
              cb(null, true);
            }
          },
      }))
    async updateUser(@Param("id") id: string, @Body() body: any, @UploadedFile() file: Express.Multer.File){
      //  console.log("\n", file, "\n", body);
       const filePath = file?.path || ""
       return this.commandBus.execute(new UpdateUserCommand(id, filePath ?? "", body?.data));
    }
}


