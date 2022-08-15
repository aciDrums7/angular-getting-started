import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, tap} from 'rxjs';
import {ProductService} from '../../../product.service';
import {IProduct} from '../../../product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<IProduct | undefined> {

  constructor(private service: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct | undefined> {
    const id = Number(route.paramMap.get('id'));
    return this.service.getProductById(id).pipe(
      //tap(data => console.log(`Product by id ${id}: `, JSON.stringify(data))),
      catchError(this.service.handleError)
    );
  }
}
