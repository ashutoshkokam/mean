import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router"
import { Observable, of } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
    isActivated: boolean;
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.getAuthStatus().pipe(
            map(isAuthenticated => {
                if (isAuthenticated)
                    return true;
                else {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
            }), catchError((err) => {
                this.router.navigate(['/auth/login']);
                return of(false);
            }));

    }

}
