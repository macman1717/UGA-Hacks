import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public getReliefRequestsByUser(username: string): Observable<Object> {
    console.log("hello world")
    return this.http.get(`https://uga-hacks.vercel.app/api/${username}/requests/`);
  }
}
