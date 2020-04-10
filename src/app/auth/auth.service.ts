import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token:string;
    constructor(private httpClient: HttpClient) { }
    getToken(){
        return this.token;
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
        this.httpClient.post<{token:string}>("http://localhost:3000/api/user/login", authData)
            .subscribe((data) => {
                this.token = data.token;
                //console.log(data);
            })
    }
}