import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ReliefRequest} from "../models/disaster-relief-request.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  apiUrl = "https://uga-hacks.vercel.app/api/"
  constructor(private http : HttpClient) {

  }

  public getReliefRequestsById(rr_oid: string): Observable<ReliefRequest[]> {
    return this.http.get<ReliefRequest[]>(`${this.apiUrl}requests/${rr_oid}`);
  }

  public getReliefRequestsByUser(username: string): Observable<ReliefRequest[]> {
    return this.http.get<ReliefRequest[]>(`${this.apiUrl}${username}/requests/`);
  }

  public getReliefRequestsByBounds(upperLong : number, lowerLong : number, upperLat : number, lowerLat : number): Observable<ReliefRequest[]>{
    return this.http.post<ReliefRequest[]>(`${this.apiUrl}requests/range`,
      {
        "upper_bound_lng": upperLong,
        "lower_bound_lng": lowerLong,
        "upper_bound_lat": upperLat,
        "lower_bound_lat": lowerLat
      })
  }

  public postReliefRequest(reliefRequest : ReliefRequest):Observable<ReliefRequest> {
    return this.http.post<ReliefRequest>(`${this.apiUrl}request/`, reliefRequest)
  }
}
