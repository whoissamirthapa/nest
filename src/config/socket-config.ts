import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // console.log(client);
    console.log('Client connected to Chat namespace:', client.id);
    // console.log(args);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected from Chat namespace:', client.id);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, payload: { room: string }) {
    const { room } = payload;
    client.join(room);
    console.log(`Client ${client.id} joined room: ${room}`);
  }

  @SubscribeMessage('news-feed')
  handleNewPost(client: Socket, payload: { room: string; post: any }) {
    const { room, post } = payload;
    console.log(`Received new post in room ${room}: ${post}`);
    // Handle new post logic
    this.server.to(room).emit('new-post', { post }); // Broadcast the new post to all clients in the room
  }

  @SubscribeMessage('indv-post')
  handleIndvPost(client: Socket, payload: { room: string; post: any }) {
    const { room, post } = payload;
    console.log(room);
    this.server.to(room).emit('get-post', { post });
  }

  @SubscribeMessage('group-chat')
  handleGroupChatMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;
    console.log(`Received group chat message in room ${room}: ${message}`);
    // Handle group chat message logic
    this.server.to(room).emit('group-chat', { message }); // Broadcast the message to all clients in the room
  }

  @SubscribeMessage('personal-chat')
  handlePersonalChatMessage(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;
    console.log(`Received personal chat message in room ${room}: ${message}`);
    // Handle personal chat message logic
    this.server.to(room).emit('personal-chat', { message }); // Broadcast the message to all clients in the room
  }

  @SubscribeMessage('notifications')
  handleNotification(
    client: Socket,
    payload: { room: string; message: string },
  ) {
    const { room, message } = payload;
    console.log(`Received notification in room ${room}: ${message}`);
    // Handle notification logic
    this.server.to(room).emit('notification', { message }); // Broadcast the notification to all clients in the room
  }
}

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, { ...options, cors: true });
    return server;
  }
}
