import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthSignupComponent } from './pages/auth-signup/auth-signup.component';
import { AuthRecoveryMailComponent } from './pages/auth-recovery-mail/auth-recovery-mail.component';
import { AuthRecoveryPasswordComponent } from './pages/auth-recovery-password/auth-recovery-password.component';
import { AuthRecoverySuccessComponent } from './pages/auth-recovery-success/auth-recovery-success.component';
//======================================================================

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      { path: "", component: AuthLoginComponent },
      { path: "login", component: AuthLoginComponent },
      { path: "signup", component: AuthSignupComponent },
      { path: "recovery/email", component: AuthRecoveryMailComponent },
      { path: "recovery/password", component: AuthRecoveryPasswordComponent },
      { path: "success/:type", component: AuthRecoverySuccessComponent },
    ]
  }
];


//======================================================================

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

//======================================================================

export class AuthRoutingModule { }
