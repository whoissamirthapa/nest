import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";

export const dbConfig = {
    uri: 'mongodb://0.0.0.0:27017/first_db',
    option: {

    }
  };

@Module({
    imports: [
        MongooseModule.forRoot(dbConfig.uri)
    ],
})
export class DatabaseModule{}


