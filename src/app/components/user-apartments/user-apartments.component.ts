import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../interfaces";
import {UserService} from "../../services/user.service";
import {ApartmentService} from "../../services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-apartments',
  templateUrl: './user-apartments.component.html',
  styleUrls: ['./user-apartments.component.css']
})
export class UserApartmentsComponent implements OnInit {

  apartments: Apartment[] = [];

  constructor(private userService: UserService,
              private apartmentService: ApartmentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserApartments().subscribe((apartments) => {
      this.apartments = apartments;
    });
  }

  delete(id: number) {
    this.apartmentService.deleteApartment(id).subscribe(() => {
      this.apartments = this.apartments.filter((apartment) => apartment.id !== id);

    });
  }
}
