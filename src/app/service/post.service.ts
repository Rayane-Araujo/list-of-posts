import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }


  getPosts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }


  updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${post.id}`, post);
  }


  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }
}
