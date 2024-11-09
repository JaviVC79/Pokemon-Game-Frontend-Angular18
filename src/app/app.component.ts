import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from './prueba/prueba.logicGame.service';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, RouterModule, MatSlideToggleModule, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule
  ],
  providers: [CookieService, AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'myapp';
  isLogin: boolean | null = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLogin = status;
    });
  }
  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }

}
