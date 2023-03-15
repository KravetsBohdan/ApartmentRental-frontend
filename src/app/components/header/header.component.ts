import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../../services";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  email = '';

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isAuth: boolean) => {

      this.isAuth = isAuth;
      if (isAuth) {
        this.userService.getCurrentUser().subscribe((user: User) => {
          this.email = user.email;
        });
      } else {
        this.email = '';
      }
  });
  }
  onLogout(): void {
    this.authService.logout();
  }

}

