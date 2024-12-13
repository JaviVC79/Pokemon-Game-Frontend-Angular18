import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from './websockets.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService, private webSocketService: WebSocketService) { }
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  login() {
    const logged = this.isLogin;
    if (!logged) this.loggedInSubject.next(false);
    else this.loggedInSubject.next(true);
  }

  isLogin(): boolean | null {
    if (this.cookieService.get('jwt')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.webSocketService.onUserDisconnected();
    this.cookieService.delete('jwt');
    this.cookieService.delete('room');
    this.loggedInSubject.next(false);
  }
}


