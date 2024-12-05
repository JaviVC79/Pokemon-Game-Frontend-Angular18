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
  private isConnected = false;

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
    if (!this.isConnected) {
      this.socket.connect();
      this.isConnected = true;
    }
  }

  joinRoom() {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.socket.emit('joinRoom', room);
  }

  saveGame(state: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.socket.emit('saveGame', { room: room, state });
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

  sendMessage(message: string) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.socket.emit('sendMessage', { room: room, message });
  }

  disconnect() {
    this.socket.disconnect()
    this.isConnected = false;
  }

  attack(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.socket.emit('attack', { room: this.currentRoom, message });
  }

  onAttack(): Observable<any> {
    return fromEvent(this.socket, 'attack');
  }

}



