import {Component, OnInit} from '@angular/core';
import {Apartment} from "../../interfaces";
import {ApartmentService} from "../../services";
import {cities} from "../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = '';
  city = 'All cities';
  cities: string[] = ['All cities', ...cities];
  apartments: Apartment[] = [];

  currentPage = 1;
  pageSize = 3;
  totalItems: number;
  sortBy = '';
  sortDir = 'asc';

  constructor(
    private apartmentService: ApartmentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    const city = this.city === 'All cities' ? '' : this.city;
    this.apartmentService
      .getAllApartments(
        this.query,
        city,
        this.currentPage - 1,
        this.pageSize,
        this.sortBy,
        this.sortDir)
      .subscribe(
        data => {
          console.log(data)
          this.apartments = data.content;
          this.totalItems = data.totalElements;
        },
      );
    this.router.navigate(['/apartments'], {
      queryParams: {query: this.query, city: this.city},
    });
  }

  onSort(): void {
    this.sortBy = 'pricePerDay';
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.onSearch();
  }
}

