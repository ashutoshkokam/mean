import { HttpInterceptor, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, pipe, throwError } from "rxjs";
import { AuthService } from "../app/auth/auth.service";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { MatDialog } from "@angular/material";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An Unknown Exception Occured!'
            if(error.error.message)
                errorMessage = error.error.message
            this.dialog.open(ErrorComponent, { data: { message: errorMessage } })
            return throwError(error);
        }));
    }

}