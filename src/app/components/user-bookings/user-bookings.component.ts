import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Booking} from "../../interfaces";
import {BookingService} from "../../services/booking.service";

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
      this.ngOnInit();
   });
  }
}
