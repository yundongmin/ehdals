import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Login, UserNoPW } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const login: Login = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(login).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.userNoPW);
        this.flashMessage.show('로그인 성공', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
        this.router.navigate(['login']);
      }
    });
  }
}
