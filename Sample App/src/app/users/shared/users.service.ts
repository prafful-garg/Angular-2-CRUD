import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { User } from './user';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {

  private url = environment.serviceEndPoint;

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getUser(id): Observable<User> {
    return this.http.get(this.getUserUrl(id))
      .map(res => res.json());
  }

  addUser(user: User): Observable<User> {
    return this.http.post(this.url, JSON.stringify(user))
      .map(res => res.json());
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.getUserUrl(user.id), JSON.stringify(user))
      .map(res => res.json());
  }


  deleteUser(id): Observable<User> {
    return this.http.delete(this.getUserUrl(id))
      .map(res => res.json());
  }

  private getUserUrl(id) {
    return this.url + '/' + id;
  }
}
