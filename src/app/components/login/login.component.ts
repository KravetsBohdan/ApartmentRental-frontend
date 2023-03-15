import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }



  login(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe(() => {
        this.router.navigate(['user']);
    });
  }
}
