import {Component, OnInit} from '@angular/core';
import {Apartment, Booking} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentService} from "../../services";
import {BookingService} from "../../services/booking.service";

@Component({
  selector: 'app-user-apartment-details',
  templateUrl: './user-apartment-details.component.html',
  styleUrls: ['./user-apartment-details.component.css']
})
export class UserApartmentDetailsComponent implements OnInit{
  apartment: Apartment;
  bookings: Booking[] = [];

  constructor(private route: ActivatedRoute,
              private apartmentService: ApartmentService,
              private bookingService: BookingService,
              private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.apartmentService.getApartmentById(id).subscribe(apartment => {
        this.apartment = apartment;
      });
      this.apartmentService.getBookingsByApartmentId(id).subscribe(bookings => {
        this.bookings = bookings;
        console.log(bookings);
      });
    });
  }

  approveBooking(id: number) {
    this.bookingService.approveBooking(id).subscribe(() => {
      this.router.navigate(['/user/apartments'])
    });
  }

  rejectBooking(id: number) {
    this.bookingService.rejectBooking(id).subscribe(() => {
      this.router.navigate(['/user/apartments'])
    });
  }
}
