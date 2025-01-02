import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
