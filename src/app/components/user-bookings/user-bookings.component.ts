import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {Apartment, Booking} from "../../interfaces";
import {BookingService} from "../../services/booking.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit{
  bookings: Booking[] = [];

  constructor(private userService: UserService, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.userService.getUserBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  deleteBooking(id: number) {
   return this.bookingService.deleteBooking(id).subscribe(() => {
      this.bookings = this.bookings.filter((booking) => booking.id !== id);
   });
  }
}
