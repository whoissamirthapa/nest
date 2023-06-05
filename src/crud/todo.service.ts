import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './crud.schema';
import { Injectable} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { resFunction, resMessage } from 'src/utils/response';

@Injectable()
export class TodoService{

  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<TodoDocument>
  ){}
  private todos: any[] = []

  async createTodo(title: string,description: string, author: string): Promise<any> {
    const todo = {title, description, author, progress: "TODO"};
    // console.log(todo);
    // this.todos.push(todo);
    return resFunction(async ()=>{
      const resFun = await this.todoModel.create(todo);
      return resMessage(resFun, "Successfully created!");
    });
  }

  getTodoAll(): any{
    return resFunction(async()=>{
      const res = await this.todoModel.find();
      // console.log("get todo all",res);
      return resMessage(res, "");
    })
    // return this.todos;
  }
  
  getTodoPagination(page_number: number): any{
    return resFunction(async()=>{
      // const pageNumber = 1;
      const pageSize = 30;
      let itemToSkip = (page_number - 1 ) * pageSize;
      const res = await this.todoModel.find().sort({ _id: -1 }).skip(itemToSkip).limit(pageSize);
      return resMessage(res, ""); 
    })
  }

  deleteTodo(id: number){
    return resFunction(async()=>{
      const res = await this.todoModel.findOneAndDelete({
        _id: id
      });
      return resMessage(res, "Successfully deleted!");
    })
  }

  editTodo(id: number, data: any){
    return resFunction(async()=>{
      const res = await this.todoModel.findOneAndReplace({
        _id: id
      }, data);
      return resMessage(res, "Successfully edited!");
    })
  }

  editTodoProgress(id: string[], data: any){
    return resFunction(async()=>{
      const res = await this.todoModel.updateMany(
        {
        _id: { $in: id }
        }, 
        {
          $set: { progress: data}
        }
      )
      return resMessage(res, "Successfully edited!");
    })
  }

  getTodoOnly(page_number:number){
    return resFunction(async()=>{
      const pageSize = 30;
      let itemToSkip = (page_number - 1 ) * pageSize;
      const res = await this.todoModel.find({
        progress: "TODO"
      }).sort({ _id: -1 }).skip(itemToSkip).limit(pageSize);
      return resMessage(res, "");
    })
  }
  
  getTodoProgress(page_number:number){
    return resFunction(async()=>{
      const pageSize = 30;
      let itemToSkip = (page_number - 1 ) * pageSize;
      const res = await this.todoModel.find({
        progress: "PROGRESS"
      }).sort({ _id: -1 }).skip(itemToSkip).limit(pageSize);
      return resMessage(res,"");
    })
  }

  getTodoCompleted(page_number:number){
    return resFunction(async()=>{
      const pageSize = 30;
      let itemToSkip = (page_number - 1 ) * pageSize;
      const res = await this.todoModel.find({
        progress: "COMPLETED"
      }).sort({ _id: -1 }).skip(itemToSkip).limit(pageSize);
      return resMessage(res,"");
    })
  }

  deleteManyTodo(id: string[]){
    return resFunction(async()=>{
      // console.log(id)
      const res = await this.todoModel.deleteMany({ _id: { $in: id }});
      // console.log(res);
      return resMessage(res,"Sucessfully deleted!");
    })
  }
}