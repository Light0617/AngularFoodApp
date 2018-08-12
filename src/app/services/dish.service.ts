import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular : Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(_id: string): Observable<Dish> {
    return this.restangular.one('dishes', _id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes')
               .getList({featured : true})
               .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
               .pipe(map(dishes => dishes.map(dish => dish._id))
               ,catchError(error => error));
  }
}
