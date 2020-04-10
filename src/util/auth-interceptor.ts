import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../app/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Auth Invoked');
        const token = this.authService.getToken();
        const authReq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token)
        })
        return next.handle(authReq);
    }

}