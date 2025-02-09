import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comment} from "../models/disaster-relief-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = "https://uga-hacks.vercel.app/api/"
  constructor(private http : HttpClient) { }

  public updateComment(comment : Comment){
    return this.http.put(`${this.apiUrl}comment/${comment.id}}`, comment)
  }

  public deleteComment(id : string){
    return this.http.delete(`${this.apiUrl}comment/${id}}`)
  }

  public postComment(comment : Comment):Observable<Comment>{
    return this.http.post<Comment>(`${this.apiUrl}comment/`, comment)
  }

}
