import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    // console.log(roles);
    // if (!roles) {
    //   return true; // If no roles are specified, allow access
    // }
    
    //----------------------manual authorization-----------------------//
    const request = context.switchToHttp().getRequest();
    const token= request.headers?.authorization;
    const user = this.jwtService.verify(token?.slice(7,token?.length), { secret: "fagalsiefasldfkansodifansoif"})
    if(!user){
        return false;
    }
    //----------------------!manual authorization!-----------------------//

    // // Check if the user has the required role
    const hasRole = roles.some(role => user.roles.includes(role));
    return hasRole;
  }
}


import {SetMetadata} from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);