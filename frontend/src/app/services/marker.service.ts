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
    const data = this.http.get<ReliefRequest[]>(`https://uga-hacks.vercel.app/api/${username}/requests/`);
    return data;
  }

  public getReliefRequestsByBounds(upperLong : number, lowerLong : number, upperLat : number, lowerLat : number): Observable<ReliefRequest[]>{
    const data = this.http.post<ReliefRequest[]>("https://uga-hacks.vercel.app/api/requests/range",
      {
        "upper_bound_lng": upperLong,
        "lower_bound_lng": lowerLong,
        "upper_bound_lat": upperLat,
        "lower_bound_lat": lowerLat
      })
    return data
  }
}
