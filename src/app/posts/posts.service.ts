import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


const BACKEND_URL = environment.baseURI + '/posts/';
@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private httpClient: HttpClient, private router: Router) { }
  private posts: Post[] = [];
  private postsUpdated = new Subject<any>();

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.httpClient
      .get<any>(BACKEND_URL + queryParams)
      .pipe(map((data) => {
        return {
          posts: data.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              createdBy: post.createdBy,
              imagePath:post.imagePath
            }
          }),
          maxPosts: data.maxPosts
        }
      }))
      .subscribe((tranformedData) => {
        console.log(tranformedData);
        this.posts = tranformedData.posts;
        this.postsUpdated.next({ posts: [...this.posts], maxPosts: tranformedData.maxPosts })
      });
    //return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    //const post: Post = { id: null, title: title, content: content,createdBy:null };
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.httpClient.post<any>(BACKEND_URL, postData)
      .subscribe((resData) => {
        //console.log(resData.message+resData.id);
        //const post: Post = { id: null, title: title, content: content,createdBy:null }
        // const post = {...resData};
        // post.id = resData.id;
         this.posts.push(resData);
         this.postsUpdated.next([...this.posts])
        //this.getPosts();
        this.router.navigate(['/']);
      });

  }
  deletePost(id: string) {
    //console.log(id);
    return this.httpClient.delete<any>(BACKEND_URL + id);
    // .subscribe((data) => {
    //   //console.log(data.message + " deleted");
    //   this.posts = this.posts.filter(post => post.id !== id);
    //   this.postsUpdated.next([...this.posts]);

    // })
  }

  updatePost(id: string, title: string, content: string,image :File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        createdBy: null
      };
    }
    //const post: Post = { id: id, title: title, content: content, createdBy: null };
    this.httpClient.put<any>(BACKEND_URL + id, postData)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/']);
      })
  }

  getPost(id: string) {
    //from server
    return this.httpClient.get<any>(BACKEND_URL + id)
    //return { ...this.posts.find(p => p.id === id) };
  }
}
