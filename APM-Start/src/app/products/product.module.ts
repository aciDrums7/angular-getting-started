import {NgModule} from '@angular/core';
import {ProductListComponent} from './product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {RouterModule} from '@angular/router';
import {ProductDetailGuard} from './product-detail/guards/on-activate/product-detail.guard';
import {ProductDetailResolver} from './product-detail/guards/resolver/product-detail.resolver';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        resolve: {product: ProductDetailResolver},
        component: ProductDetailComponent
      }
    ]),
  ]
})
export class ProductModule {}
