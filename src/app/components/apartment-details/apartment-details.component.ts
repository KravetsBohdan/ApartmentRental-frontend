import {Component, Input, OnInit} from '@angular/core';
import {Apartment, Booking} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentService, AuthService} from "../../services";
import {BookingService} from "../../services/booking.service";
import {DateFilterFn} from "@angular/material/datepicker";


@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit {
  apartment: Apartment;
  bookings: Booking[] = [];
  booking: Booking = {
    id: 0,
    startDate: new Date(),
    endDate: new Date(),
    totalPrice: 0
  };
  disabledDates: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    private apartmentService: ApartmentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apartmentService.getApartmentById(+params.get('id')!).subscribe(apartment => {
        this.apartment = apartment;
        this.apartmentService.getBookedDays(this.apartment.id).subscribe(bookedDays => {
          this.disabledDates = bookedDays;
        });
        this.apartmentService.getBookingsByApartmentId(this.apartment.id).subscribe(bookings => {
          this.bookings = bookings;
        });
      });
    });
  }



  bookApartment() {
    this.authService.isAuthenticated().subscribe((isAuth: boolean) => {
      if (!isAuth) {
        this.router.navigate(['/login']);
        return;
      }

      this.booking.totalPrice = this.calculateTotalPrice();
      this.bookingService.addBooking(this.booking, this.apartment.id).subscribe(
        () => {
          this.router.navigate(['/apartments']);
        });
    });
  }

  calculateTotalPrice(): number {
    if (!this.booking.startDate || !this.booking.endDate) {
      return 0;
    }

    const startDate = new Date(this.booking.startDate);
    const endDate = new Date(this.booking.endDate);
    const numDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return numDays * this.apartment.pricePerDay;
  }

}

