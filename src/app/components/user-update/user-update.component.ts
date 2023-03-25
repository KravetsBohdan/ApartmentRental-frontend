import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{

  user: User;

  updateUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl('')
  });

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

      this.userService.getCurrentUser().subscribe((user) => {
        this.updateUserForm.patchValue(user);
        this.user = user;
      });


  }

  updateUserInfo() {
    this.userService.updateUser(this.updateUserForm.value).subscribe(() => {
      alert('User info updated successfully!');
      this.router.navigate(['/user/profile']);
    });
  }
}
