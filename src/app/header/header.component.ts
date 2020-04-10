import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  header: string = 'MEAN Guide!'
  private authSub: Subscription;
  userIsAuthenticated: boolean = false;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authSub = this.authService.getAuthStatus().subscribe((isAuthenticated) => {
      this.userIsAuthenticated = isAuthenticated;
    })

  }
  logOut(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
