import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApartmentService} from "../../services";
import {Router} from "@angular/router";
import {cities} from "../../constants/cities";
import {Apartment} from "../../interfaces";
import {PhotoService} from "../../services/photo.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './apartment-add.component.html',
  styleUrls: ['./apartment-add.component.css']
})
export class ApartmentAddComponent implements OnInit {
  cities: string[] = cities;


  addApartmentForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    city: new FormControl(''),
    location: new FormControl(''),
    pricePerDay: new FormControl(0),
    roomsNumber: new FormControl(0),
  });

  apartment: Apartment;
  photo: File;

  constructor(private apartmentService: ApartmentService,
              private router: Router,
              private photoService: PhotoService) {
  }


  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.photo = event.target.files[0];
  }

  addApartment() {
      this.apartment = this.addApartmentForm.value;
      if (this.photo) {
        this.photoService.uploadImage(this.photo).subscribe(response => {
            this.apartment.photoUrl = response;
            this.apartmentService.addApartment(this.apartment).subscribe(() => {
              alert('Apartment added successfully!');
              this.router.navigate(['/user/apartments']);
            });
          });
      } else {
        console.log('No photo');
      }
  }
}
