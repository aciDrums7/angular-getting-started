import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProduct} from '../product';
import {Subscription} from 'rxjs';
import {ProductService} from '../product.service';

@Component({
  //selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    //alternative to snapshot is to subscribe to the route observable, like:
    //'this.route.paramMap.subscribe(Observer etc...)'
    this.sub = this.activatedRoute.data.subscribe({
      next: response => this.product = response['product'],
      error: err => console.error(err)
      });
  }

  onBack(): void {
    this.router.navigate(['products']).then();
  }

}
