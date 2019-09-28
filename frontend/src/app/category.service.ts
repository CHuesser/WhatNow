import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Category} from './types';
import {flatMap, map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    URL = './assets/data/category.json';

    constructor(public httpClient: HttpClient) {
    }

    getCategory(categoryID: number): Observable<Category> {
        return this.httpClient.get<Category[]>(this.URL).pipe(map(val => val.find(cat => cat.category_id == categoryID),
            switchMap((cat: Category) => {
                if (cat.parent_category_id) {
                    return this.httpClient.get<Category[]>(this.URL).pipe(map
                    (val => val.find(cat2 => cat2.category_id == cat.parent_category_id)));
                } else {
                    return of(cat);
                }
            })));
    }
}
