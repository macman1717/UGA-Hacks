import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ReliefRequest} from "../models/disaster-relief-request.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http : HttpClient) { }

  public getReliefRequestsByUser(username: string): Observable<ReliefRequest[]> {
    console.log("hello world");
    const data = this.http.get<ReliefRequest[]>(`https://uga-hacks.vercel.app/api/${username}/requests/`);
    data.forEach(value => console.log(value))
    return data;
  }
}
