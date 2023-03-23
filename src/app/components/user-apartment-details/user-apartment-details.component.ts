import {Component, OnInit} from '@angular/core';
import {Apartment, Booking} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
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
              private bookingService: BookingService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.apartmentService.getApartmentById(id).subscribe(apartment => {
        this.apartment = apartment;
      });
      this.apartmentService.getBookingsByApartmentId(id).subscribe(bookings => {
        this.bookings = bookings;
      });
    });
  }

  approveBooking(id: number) {
    this.bookingService.approveBooking(id).subscribe(() => {
     this.apartmentService.getBookingsByApartmentId(this.apartment.id).subscribe(bookings => {
        this.bookings = bookings;
     });
    });
  }

  rejectBooking(id: number) {
    this.bookingService.rejectBooking(id).subscribe(() => {
      this.apartmentService.getBookingsByApartmentId(this.apartment.id).subscribe(bookings => {
        this.bookings = bookings;
      });
    });
  }
}
