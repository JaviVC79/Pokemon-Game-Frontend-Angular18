import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-player-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-player-form.component.html',
})
export class LoginPlayerFormComponent implements OnInit {
  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) { }

  title = 'createPlayerForm';
  email: string = '';
  password: string = '';
  users: any[] = [];
  cookie: string | null = null;
  isLogin: boolean | null = false;

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLogin = status;
    });
  }
  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }

  async onSubmit() {
    const player = {
      email: this.email,
      password: this.password,
    };
    this.users.push(player);
    this.loginPlayer(player)

  }
  async loginPlayer(player: any) {
    try {
      const response = await lastValueFrom(this.http.post<any>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api/login`, player, { withCredentials: true }));
      if (!response) return null;
      this.cookie = response.access_token;
      this.cookieService.set('jwt', response.access_token);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }
}