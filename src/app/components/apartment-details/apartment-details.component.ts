import {Component, OnInit} from '@angular/core';
import {Apartment, Booking} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentService, AuthService, BookingService} from "../../services";



@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent implements OnInit {
  isAuth: boolean = false;
  apartment: Apartment;
  bookings: Booking[] = [];
  booking: Booking = {
    id: 0,
    startDate: null,
    endDate: null,
    totalPrice: 0
  };
  error: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private bookingService: BookingService,
    private apartmentService: ApartmentService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.apartmentService.getApartmentById(+params.get('id')!).subscribe(apartment => {
        this.apartment = apartment;
        this.apartmentService.getBookingsByApartmentId(this.apartment.id).subscribe(bookings => {
          this.bookings = bookings;
        });
        this.authService.isAuthenticated().subscribe((isAuth: boolean) => {
          this.isAuth = isAuth;
        });
      });
    });
  }


  bookApartment() {
    if (!this.isAuth) {
      this.router.navigate(['/login']);
      return;
    }


    this.booking.totalPrice = this.calculateTotalPrice();

    this.bookingService.addBooking(this.booking, this.apartment.id).subscribe(
      () => {
        this.router.navigate(['/apartments']);
      },
      error => {
        this.error = error;
      }
    );
  }

  calculateTotalPrice(): number {
    if (!this.booking.startDate || !this.booking.endDate) {
      return 0;
    }

    const startDate = new Date(this.booking.startDate);
    const endDate = new Date(this.booking.endDate);
    const numDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return (numDays + 1) * this.apartment.pricePerDay;
  }

}

