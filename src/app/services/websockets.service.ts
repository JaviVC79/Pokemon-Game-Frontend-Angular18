import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, fromEvent } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Pokemon } from '../utils/types/pokemonType';


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
    const room = cookieService.get('room');
    super({
      url: 'https://apipokemongamenestjs.onrender.com', options: {
        withCredentials: true,
        extraHeaders: {
          'user_id': cookieService.get('user_id'),
          'client_id': clientId,
          'room': room
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

  attackAllYourEnemies(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('attackAllYourEnemies', { room: room, message });
  }

  onAttackAllYourEnemies(): Observable<any> {
    return fromEvent(this.ioSocket, 'attackAllYourEnemies');
  }

  specialAttack(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('specialAttack', { room: room, message });
  }

  onSpecialAttack(): Observable<any> {
    return fromEvent(this.ioSocket, 'specialAttack');
  }

  defendAllYourPokemons(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('defendAllYourPokemons', { room: room, message });
  }

  onDefendAllYourPokemons(){
    return fromEvent(this.ioSocket, 'defendAllYourPokemons');
  }

  specialDefense(message: any) {
    const room = this.cookieService.get('room');
    this.currentRoom = room;
    this.ioSocket.emit('specialDefense', { room: room, message });
  }

  onSpecialDefense(): Observable<any> {
    return fromEvent(this.ioSocket, 'specialDefense');
  }

}



