import { Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";



@Controller("todo_todo")
export class TodoController{
    constructor(){}

    @Get()
    getList(@Res() res: Response){
       res.status(200).json({
        success: true,
        data: "Message send successfully!"
       });
    }
    @Post()
    addList(@Req() req: Request, @Res() res: Response){
        // console.log(req.body);
        if(req.body){
            res.status(201).json({
                succcess: true,
                data: req.body
            })
            return;
        }
        res.status(201).json({
            succcess: false,
            data: "Something went wrong"
        })
    }
}