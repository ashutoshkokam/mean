import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { PageEvent } from "@angular/material";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/user.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  userData:User;
  totalPosts: number = 0;
  postsPerPage: number = 2;
  currentPage: number = 1;
  isUserAuthenticated: boolean = false;
  pageSizeOptions: number[] = [1, 2, 5, 10];
  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.userData=this.authService.getUserData();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: any) => {
        this.posts = posts.posts;
        this.totalPosts = posts.maxPosts;
      });
    this.authStatusSub = this.authService.getAuthStatus().subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
      this.userData = this.authService.getUserData();
    })
  }
  onDelete(id: string): void {
    this.postsService.deletePost(id)
      .subscribe((data) => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
  }
  onChangePage(pageData: PageEvent) {
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
