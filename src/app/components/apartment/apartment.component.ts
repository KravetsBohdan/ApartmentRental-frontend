import {Component, Input} from '@angular/core';
import {Apartment} from "../../interfaces";

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent {
  @Input() apartment: Apartment;
}
