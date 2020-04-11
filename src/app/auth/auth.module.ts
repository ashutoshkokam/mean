import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../angular-material.module";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    }
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    exports: [],
})
export class AuthModule { }