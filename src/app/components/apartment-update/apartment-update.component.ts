import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApartmentService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {Apartment} from "../../interfaces";
import {cities} from "../../constants/cities";

@Component({
  selector: 'app-update-apartment',
  templateUrl: './apartment-update.component.html',
  styleUrls: ['./apartment-update.component.css']
})
export class ApartmentUpdateComponent implements OnInit{
  apartment: Apartment;
  cities: string[] = cities;

  updateApartmentForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    city: new FormControl(''),
    location: new FormControl(''),
    pricePerDay: new FormControl(0),
    roomsNumber: new FormControl(0)
  });

  constructor(private apartmentService: ApartmentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.apartmentService.getApartmentById(+params.get('id')!).subscribe((apartment) => {
        this.updateApartmentForm.patchValue(apartment);
        this.apartment = apartment;
      });
    });


  }

  updateApartment() {
    this.apartmentService.updateApartment(this.apartment.id, this.updateApartmentForm.value).subscribe(() => {
      alert('Apartment updated successfully!');
      this.router.navigate(['/user/apartments']);
    });
  }
}
