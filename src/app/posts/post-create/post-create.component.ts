import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import{Mode} from '../../../util/enum'
import { PostsService } from "../posts.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  mode: string = Mode.CREATE;
  postId: string;
  post:Post;

  constructor(public postsService: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = Mode.EDIT;
        this.postId = paramMap.get('postId');
         this.postsService.getPost(this.postId)
         .subscribe((postData)=>{
           this.post = {id:postData._id,title:postData.title,content:postData.content};
         });
      }
      else {
        this.mode = Mode.CREATE;
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode === Mode.CREATE)
      this.postsService.addPost(form.value.title, form.value.content);
    else if(this.mode===Mode.EDIT)
      this.postsService.updatePost(this.postId,form.value.title, form.value.content);
    form.resetForm();
    this.router.navigate(['/']);
    //this.postsService.getPosts();
  }
}
