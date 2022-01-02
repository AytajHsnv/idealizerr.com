import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthSignupComponent } from './pages/auth-signup/auth-signup.component';
import { AuthRecoveryMailComponent } from './pages/auth-recovery-mail/auth-recovery-mail.component';
import { AuthRecoveryPasswordComponent } from './pages/auth-recovery-password/auth-recovery-password.component';
import { AuthRecoverySuccessComponent } from './pages/auth-recovery-success/auth-recovery-success.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { OrHolderComponent } from './components/or-holder/or-holder.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxEaIntlTelInputModule } from '../lib/components/inputs/ngx-ea-intl-tel-input/ngx-ea-intl-tel-input.module';
//======================================================================

@NgModule({
  declarations: [
    AuthLoginComponent, 
    AuthSignupComponent, 
    AuthRecoveryMailComponent, 
    AuthRecoveryPasswordComponent, 
    AuthRecoverySuccessComponent, 
    AuthLayoutComponent, 
    SocialLoginComponent, 
    OrHolderComponent, 
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthRoutingModule,
    NgxEaIntlTelInputModule
  ]
})

//======================================================================

export class AuthModule { }
