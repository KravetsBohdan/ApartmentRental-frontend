import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReviewService} from "../../services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css']
})
export class ReviewAddComponent implements OnInit {
  error: string;
  reviewForm: FormGroup = new FormGroup({
    reviewText: new FormControl(''),
    rating: new FormControl(1),
  });
  apartmentId: number;

  constructor(private reviewService: ReviewService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.apartmentId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  addReview(): void {
    this.reviewService.addReview(this.reviewForm.getRawValue(), this.apartmentId).subscribe(() => {
        this.router.navigate(['apartments']);
      },
      error => {
        this.error = error
      });
  }
}
