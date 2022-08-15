import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';
import {Subscription} from 'rxjs';

@Component({
  //selector: 'pm-products',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  private _listFilter: string = '';

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  errorMessage: string = '';

  //sub: Subscription | undefined;
  //alternativa al dover dichiarare una variabile undefined: definite assignment
  //dice al compilatore di Angular che ci occuperemo, ad un certo punto, dell'inizializzazione
  //di questa proprietà
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  get listFilter() : string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter();
  }


  ngOnInit(): void {
    this.sub = this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(): IProduct[] {
    let filterBy = this.listFilter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string) {
    this.pageTitle += `: ${message}`;
  }

}
