import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../interfaces";
import {ApartmentService} from "../../services";
import {cities} from "../../constants/cities";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = '';
  city = '';
  cities: string[] = ['All cities', ...cities];
  apartments: Apartment[] = [];

  currentPage = 1;
  pageSize = 3;
  totalItems: number;
  sortDir = 'asc';

  constructor(
    private apartmentService: ApartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSearch(): void {
    this.apartmentService
      .getAllApartments(
        this.currentPage - 1,
        this.pageSize,
        this.query,
        this.city,
        'pricePerDay',
        this.sortDir
      )
      .subscribe(
        (data) => {
          this.apartments = data.content;
          this.totalItems = data.totalElements;
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
    this.router.navigate(['/apartments'], {
      queryParams: { query: this.query, city: this.city },
    });
  }

  onSort(): void {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    console.log(this.sortDir);
    this.onSearch();
  }
}

