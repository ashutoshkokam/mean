import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Mode } from '../../../util/enum'
import { PostsService } from "../posts.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { SpinnerService } from "src/util/spinner.service";

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
  post: Post;
  imagePreview: string = '';
  imageFile:File;
  constructor(public postsService: PostsService, private router: Router, 
    private route: ActivatedRoute,private spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = Mode.EDIT;
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId)
          .subscribe((postData) => {
            this.post = { id: postData._id, title: postData.title, content: postData.content, 
              createdBy: postData.createdBy,imagePath:postData.imagePath };
              this.imagePreview = this.post.imagePath;
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
    if (this.mode === Mode.CREATE)
      this.postsService.addPost(form.value.title, form.value.content,this.imageFile);
    else if (this.mode === Mode.EDIT)
      this.postsService.updatePost(this.postId, form.value.title, form.value.content,this.imageFile?this.imageFile:this.imagePreview);
    form.resetForm();
    this.clearData();
    //this.postsService.getPosts();
  }
  clearData(){
    this.imagePreview=null;
    this.imageFile=null;
  }
  onImagePicked(event: Event) {
    this.imagePreview='';
    const file = (event.target as HTMLInputElement).files[0];
    this.imageFile = file;
    //console.log(file);
    //this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.spinnerService.hide();
    };
    if (this.isValidFile(file)){
      this.spinnerService.show();
      reader.readAsDataURL(file);
    }
      
      
  }
  isValidFile(file: File) {
    let isVaid = false;
    const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (acceptedFileTypes.includes(file.type.toLowerCase()))
      isVaid = true;
    return isVaid;

  }
}
