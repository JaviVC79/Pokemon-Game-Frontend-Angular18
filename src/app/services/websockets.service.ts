import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {



  private socket: Socket;
  private currentRoom: string = "";

  constructor(private cookieService: CookieService) {
    const user_id = this.cookieService.get('user_id');
    this.socket = io('https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev', {
      withCredentials: true,
      extraHeaders: {
        'user_id': user_id
      }
    });
  }
  
  connect() {
    this.socket.connect();
  }

  joinRoom(room: string) {
    this.currentRoom = room;
    this.socket.emit('joinRoom', room);
  }

  saveGame(room: string, state: any) {
    this.socket.emit('saveGame', { room: this.currentRoom, state });
  }

  onMessage(): Observable<any> {
    return fromEvent(this.socket, 'sendMessage');
  }

  onRestoreGame(): Observable<any> {
    return fromEvent(this.socket, 'restoreGame');
  }

  onJoinRoom(): Observable<any> {
    return fromEvent(this.socket, 'joinRoom');
  }

  sendMessage(room: string, message: string) {
    this.socket.emit('sendMessage', { room: this.currentRoom, message });
  }

  disconnect() {
    this.socket.disconnect()
  }

}



