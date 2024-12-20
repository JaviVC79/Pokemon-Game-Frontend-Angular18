import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PopupNoDataComponent } from '../pop-ups/login-pop-ups/popup-no-data.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupUnauthorizedLoginComponent } from '../pop-ups/login-pop-ups/popup-unauthorized-login.component';

@Component({
  selector: 'app-login-player-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-player-form.component.html',
})
export class LoginPlayerFormComponent implements OnInit {
  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

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
    if (this.isLogin) this.router.navigateByUrl('/pokemons');
  }

  openNoDataPopup() {
    this.dialog.open(PopupNoDataComponent, {
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '500px',
    });
  }

  openUnathorizedLoginPopup() {
    this.dialog.open(PopupUnauthorizedLoginComponent, {
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '400px',
    });
  }

  async onSubmit() {
    if (this.email === "" || this.password === "") {
      this.openNoDataPopup();
      return;
    }
    const player = {
      email: this.email,
      password: this.password,
    };
    this.users.push(player);
    this.loginPlayer(player);
  }

  async loginPlayer(player: any) {
    try {
      const response = await lastValueFrom(this.http.post<any>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api/login`, player, { withCredentials: true }));
      if (!response) return null;
      this.cookie = response.access_token;
      this.cookieService.set('jwt', response.access_token);
      return response;
    } catch (error) {
      this.openUnathorizedLoginPopup();
      return error
    }
  }
}