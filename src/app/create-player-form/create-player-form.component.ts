import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../prueba/prueba.logicGame.service';
import { PopupNoDataComponent } from '../pop-ups/login-pop-ups/popup-no-data.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'createPlayerForm',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-player-form.component.html',
  //styleUrl: './app.component.css'
})
export class createPlayerFormComponent {

  constructor(private http: HttpClient, private gameService: GameService, private dialog: MatDialog, private router: Router) { }
  private apiUrl = environment.apiUrl;
  title = 'createPlayerForm';
  email: string = '';
  nickName: string = '';
  password: string = '';
  users: any[] = [];
  validPassword: boolean = true;
  validNickName: boolean = true;
  validEmail: boolean = true;

  async onSubmit() {
    if (this.email === '' || this.nickName === '' || this.password === '') {
      this.openNoDataPopup();
      return;
    }
    if (this.validateEmail(this.email) === false) {
      this.validEmail = false;
      return;
    } else { this.validEmail = true; }
    if (this.nickName.length < 4) {
      this.validNickName = false;
      return;
    } else { this.validNickName = true; }
    if (this.validatePassword(this.password) === false) {
      this.validPassword = false;
      return;
    } else { this.validPassword = true; }
    const newPlayer = {
      email: this.email,
      nickName: this.nickName,
      password: this.password,
    };
    this.users.push(newPlayer);
    this.singUp(newPlayer);

  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const maxLength = 254; // Longitud máxima recomendada para un correo electrónico
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.es', 'hotmail.com', '@icloud.com', '@aol.com']; // Dominios comunes permitidos

    if (!regex.test(email)) {
      return false; // Formato básico inválido
    }

    if (email.length > maxLength) {
      return false; // Longitud excesiva
    }

    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      return false; // Dominio no permitido
    }

    return true;
  }

  validatePassword(password: string): boolean {
    const minLength = 9;
    const maxLength = 18;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,18}$/;

    if (password.length < minLength || password.length > maxLength) {
      return false; // Longitud inválida
    }

    if (!regex.test(password)) {
      return false; // No cumple con los requisitos de letras, números y caracteres especiales
    }

    return true;
  }

  openNoDataPopup() {
    this.dialog.open(PopupNoDataComponent, {
      position: { top: '30px', right: '80px' },
      disableClose: true,
      width: '500px',
    });
  }

  async singUp(newPlayer: any) {
    const body = newPlayer;
    try {
      const response = await lastValueFrom(this.http.post<any>(`${this.apiUrl}`, body, { withCredentials: true }));
      if (!response) return null;
      this.router.navigateByUrl('/login')
      return response;

    } catch (error) {
      return error
    }
  }

  

}