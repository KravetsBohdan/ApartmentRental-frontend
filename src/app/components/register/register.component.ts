import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: string;
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router) {

  }



  register(): void {
    this.userService.register(this.registerForm.getRawValue()).subscribe(() => {
      this.router.navigate(['login']);
    },
      error => {
        console.log(error);
        this.error = error;
      });
  }
}
