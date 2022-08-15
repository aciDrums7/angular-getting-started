import {Injectable} from '@angular/core';
import {IProduct} from './product';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, tap, catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //aggiungi all'angular.json il path src/api agli assets!
  //added proxyConfig to avoid CORS errors with JSON server
  //https://www.stackhawk.com/blog/angular-cors-guide-examples-and-how-to-enable-it/
  private _productUrl = '/api/products';

  constructor(private http: HttpClient) {}

  get productUrl(): string {
    return this._productUrl;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.productUrl}`).pipe(
      //tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.productUrl}/${id}`).pipe(
      //tap(data => console.log(`Product by id ${id}: `, JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public handleError(err: HttpErrorResponse) {
    // In a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
