import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { SpinnerHttpInterceptor } from "src/util/spinner-interceptor.service";
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthInterceptor } from "src/util/auth-interceptor";
import { ErrorInterceptor } from "src/util/error.interceptor";
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from "./angular-material.module";
import { PostsModule } from "./posts/posts.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SpinnerComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PostsModule,
    AngularMaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
