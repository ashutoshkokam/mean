import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";
import { Subject, BehaviorSubject } from "rxjs";
import { isDefined } from "@angular/compiler/src/util";
import { isNullOrUndefined } from "util";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private authStatusListener = new BehaviorSubject<boolean>(false);
    private tokenTimer: any;
    constructor(private httpClient: HttpClient, private router: Router) { }
    getToken() {
        return this.token;
    }
    getAuthStatus() {
        return this.authStatusListener.asObservable();
    }
    createUser(email: string, pwd: string) {
        const authData: AuthData = { email: email, password: pwd }
        this.httpClient.post("http://localhost:3000/api/user/signup", authData)
            .subscribe((data) => {
                console.log(data);
            })
    }
    login(email: string, pwd: string) {
        const authData: AuthData = { email: email, password: pwd }
        this.httpClient.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData)
            .subscribe((data) => {
                this.token = data.token;
                const expiresIn = data.expiresIn;
                this.setAuthTimer(expiresIn);
                this.saveAuthData(this.token, new Date(new Date().getTime() + (expiresIn * 1000)));
                this.authStatusListener.next(isDefined(this.token));
                //console.log(data);
                this.router.navigate(['/']);
            })
    }
    autoAuthUser() {
        const authInfo = this.getAuthData();
        if(!authInfo){
            return;
        }
        const expiresIn = new Date( authInfo.expirationDate).getTime() - new Date().getTime()
        if (expiresIn > 0) {
            this.token = authInfo.token;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(isDefined(this.token));
        }
    }
    setAuthTimer(expiresIn: number) {
        console.log("Setting TImer" + expiresIn);
        this.tokenTimer = setTimeout(() => {
            //refresh token
            this.logout();
        }, expiresIn * 1000);
    }
    logout() {
        this.token = null;
        clearTimeout(this.tokenTimer)
        this.clearAuthData();
        this.authStatusListener.next(!isNullOrUndefined(this.token));
        this.router.navigate(['/']);
    }
    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate.toISOString());
    }
    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");// expirationDate.toISOString());
    }

    private getAuthData(): any {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expirationDate");// expirationDate.toISOString());
        if (token && expirationDate) {
            return {
                token: token,
                expirationDate: expirationDate
            }
        }
        else {
            return;
        }

    }

}