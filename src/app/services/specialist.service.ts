import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/Account';
import {SearchObject} from "../model/SearchObject";

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {
  specialistListUrl = '/api/specialist-list';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  params: HttpParams;

  constructor(private http: HttpClient) {
  }


  getSpecialistList(searchObj: SearchObject): Observable<any> {
    let params = new HttpParams();
    for (const key in searchObj) {
      console.log(key);
      const val = searchObj[key];
      if (val) {
        params = params.set(key, val);
        console.log(val);
      }
    }
    return this.http.get(`${this.specialistListUrl}`, {params: params});
    /* this.params = new HttpParams().set("searchObj", searchObj);
      return this.http.get(`${this.specialistListUrl}`, {headers: this.headers, params: searchObj});*/
  }

  post(account: Account): Observable<any> {
    return this.http.post(`${this.specialistListUrl}`, account, {headers: this.headers});
  }
}
