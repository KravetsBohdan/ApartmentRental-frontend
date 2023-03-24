import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService, AuthService} from "../../services";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  error: string;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }


  //
  login(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe(
      data => {
        this.router.navigate(['user']);
      },
      error => {
        this.error = error
      }
    );
  }
}
