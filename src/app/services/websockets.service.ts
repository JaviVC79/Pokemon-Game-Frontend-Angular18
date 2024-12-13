import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, fromEvent } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  private currentRoom: string = "";
  private isConnected = false;
  private user_id: string = "";

  constructor(private cookieService: CookieService) {
    // Método para generar un identificador único de cliente 
    function generateClientId(): string {
      return 'client_' + Math.random().toString(36).slice(2, 11);
    }
    // Generar o recuperar el client_id 
    const clientId = localStorage.getItem('client_id') || generateClientId();
    localStorage.setItem('client_id', clientId);
    super({
      url: 'https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev', options: {
        withCredentials: true,
        extraHeaders: {
          'user_id': cookieService.get('user_id'),
          'client_id': clientId
        }
      }
    })
  }


  override connect() {
    if (!this.isConnected) {
      console.log(this.user_id)
      this.ioSocket.connect();
      this.isConnected = true;
    }
    return
  }

  override disconnect() {
    const room = this.cookieService.get('room');
    if (this.isConnected) {
      this.ioSocket.disconnect();
      this.isConnected = false;
      this.ioSocket.emit('disconnectSocket', { room: room });
    }
  }

  joinRoom() {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('joinRoom', room);
  }

  onUserAuthenticated(newUserId: string) {
    this.cookieService.set('user_id', newUserId);
    this.disconnect();
    //this.initializeSocket();
    this.connect();
  }

  onUserDisconnected() {
    this.cookieService.delete('user_id');
    this.disconnect();
  }


  saveGame(state: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('saveGame', { room: room, state });
  }

  onMessage(): Observable<any> {
    return fromEvent(this.ioSocket, 'sendMessage');
  }

  onRestoreGame(): Observable<any> {
    return fromEvent(this.ioSocket, 'restoreGame');
  }

  onJoinRoom(): Observable<any> {
    return fromEvent(this.ioSocket, 'joinRoom');
  }

  sendMessage(message: string) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('sendMessage', { room: room, message });
  }

  attack(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    console.log(room)
    this.ioSocket.emit('attack', { room: room, message });
  }

  onAttack(): Observable<any> {
    return fromEvent(this.ioSocket, 'attack');
  }

  defense(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('defense', { room: this.currentRoom, message });
  }

  onDefense(): Observable<any> {
    return fromEvent(this.ioSocket, 'defense');
  }


}



