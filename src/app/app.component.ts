import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../app/services/auth.service';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
//import { CloudinaryService } from './services/cloudinary.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule, RouterModule, MatSlideToggleModule, MatIconModule, MatDividerModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [CookieService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'myapp';
  isLogin: boolean | null = null;

  constructor(private authService: AuthService, private router: Router, /*private cloudinaryService: CloudinaryService*/) { }

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLogin = status;
    });
  }
  ngDoCheck() {
    this.isLogin = this.authService.isLogin();
  }
  logOut() {
    localStorage.removeItem('client_id');
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  /*async getVideo(){
    const video = await this.cloudinaryService.getVideo();
    console.log(video)
  }*/
}
