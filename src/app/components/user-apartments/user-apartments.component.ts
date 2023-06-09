import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../interfaces";
import {UserService} from "../../services";
import {ApartmentService} from "../../services";

@Component({
  selector: 'app-user-apartments',
  templateUrl: './user-apartments.component.html',
  styleUrls: ['./user-apartments.component.css']
})
export class UserApartmentsComponent implements OnInit {
  error: string;
  apartments: Apartment[] = [];

  constructor(private userService: UserService,
              private apartmentService: ApartmentService) {
  }

  ngOnInit(): void {
    this.userService.getUserApartments().subscribe((apartments) => {
      this.apartments = apartments;
    });
  }

  delete(id: number) {
    this.apartmentService.deleteApartment(id).subscribe(() => {
      this.ngOnInit();
    },
      error => {
        this.error = error;
      });
  }
}
