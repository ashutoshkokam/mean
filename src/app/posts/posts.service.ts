import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private httpClient: HttpClient) { }
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.httpClient
      .get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((data) => {
        return data.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((tranformedData) => {
        this.posts = tranformedData;
        this.postsUpdated.next([...this.posts])
      });
    //return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };

    this.httpClient.post<any>('http://localhost:3000/api/posts', post)
      .subscribe((resData) => {
        //console.log(resData.message+resData.id);
        post.id = resData.id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts])
        //this.getPosts();
      });

  }
  deletePost(id: string) {
    console.log(id);
    this.httpClient.delete<any>('http://localhost:3000/api/posts/' + id)
      .subscribe((data) => {
        console.log(data.message + " deleted");
        this.posts = this.posts.filter(post => post.id !== id);
        this.postsUpdated.next([...this.posts]);

      })
  }

  updatePost(id: string, title: string, content: string) {
    const post = { id: id, title: title, content: content };
    this.httpClient.put<any>('http://localhost:3000/api/posts/' + id,post)
      .subscribe((data) => {
        console.log(data);
      })
  }

  getPost(id: string) {
    //from server
    return this.httpClient.get<any>("http://localhost:3000/api/posts/"+id)
    //return { ...this.posts.find(p => p.id === id) };
  }
}
