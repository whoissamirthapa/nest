import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { authTypeReq, loginAuth } from 'enum/auth';
import { resFunction, resMessage } from 'src/utils/response';
import * as bycript from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        @InjectModel(Auth.name)
        private authModel: Model<AuthDocument>
    ){}

    async addAuth(data: authTypeReq){
        // console.log(data);
        return resFunction(async ()=>{
            if(data.email.trim() === "") throw new Error("Email is required")
            
            if(data.password.trim() === "") throw new Error("Password is required")
            
            const userExist = await this.authModel.findOne({
                email: data.email
            })
            if(userExist) throw new Error("User already exist!");

            let password = await bycript.hash(data.password, 12);
            const res = await this.authModel.create({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                display_name: data.first_name+ " "+data.last_name,
                password,
                image_url: "/"
            })
            if(res){
                return resMessage(res, "Successfully registered");
            }
            throw new Error("Error while registering")
        });
    }
    async loginAuth(data: loginAuth){
        // console.log(data);
        return resFunction(async ()=>{
            const res = await this.authModel.findOne({
                email: data.email
            })
            if(!res){
                throw new Error("User not found!")
            }

            const match = await bycript.compare(data.password, res.password);
            if(!match) throw new Error("Credentials do not match!");
            
            const token = this.jwtService.sign({
                email: res.email, 
                first_name: res.first_name, 
                last_name: res.last_name, 
                display_name: res.display_name, 
                roles: res.roles,
                _id: res._id, 
            });

            return resMessage({
                token,
                data: {
                    email: res.email, 
                    first_name: res.first_name, 
                    last_name: res.last_name, 
                    display_name: res.display_name, 
                    roles: res.roles,
                    _id: res._id, 
                }
            }, "Succefully loggedin!")
        });
    }

    async getUsers (){
        return resFunction(async()=>{
            const res = await this.authModel.find();
            return resMessage(res, "Successfully found users");
        });
    }

    async getProfile(id: string){
        return resFunction(async()=>{
            const res = await this.authModel.findById(id);
            return resMessage(res, "Successfully found user");
        })
    }

    async updateProfile(id: string, path:string, data: {
        first_name: string,
        last_name: string,
        email: string,
        roles: string[]
    }){
        return resFunction(async()=>{
            const res = await this.authModel.findOneAndUpdate({
                _id: id,
            }, {
                first_name: data.first_name,
                last_name: data.last_name,
                roles: data.roles,
                email: data.email,
                display_name: data.first_name+" "+data.last_name,
                image_url: path
            }, {
                new: true
            })

            return resMessage(res, "Successfully updated")
        })
    }
    
}



// {
//     fieldname: 'file',
//     originalname: 'Screenshot 2023-05-30 172539.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: './public/image',
//     filename: 'fed861a8-6d10-4cce-b3ed-830d862b0954.png',
//     path: 'public\\image\\fed861a8-6d10-4cce-b3ed-830d862b0954.png',       
//     size: 120217
//   }