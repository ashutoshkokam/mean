import { Component, OnInit } from '@angular/core';
import {SpinnerService} from '../util/spinner.service'
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
constructor(private spinnerService:SpinnerService,private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }


}
