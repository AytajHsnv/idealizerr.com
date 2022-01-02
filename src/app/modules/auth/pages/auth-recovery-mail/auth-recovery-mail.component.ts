import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { Router } from "@angular/router";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { Location } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-auth-recovery-mail",
  templateUrl: "./auth-recovery-mail.component.html",
  styleUrls: ["./auth-recovery-mail.component.scss"]
}) //======================================================================
export class AuthRecoveryMailComponent implements OnInit {
  //======================================================================

  constructor(
    public FORM_BUILDER: FormBuilder,
    public AUTH: AuthService,
    private ROUTER: Router,
    private NOTIFY: NotifyService,
    private LOCATION: Location,
    private _: TranslateService,
    private title: Title
  ) {
    this.AUTH.auth_page_location.next("recovery_email");
    this.buildForm();
  }

  //======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.recover-pass')}`);
  }

  //======================================================================

  public form: FormGroup;
  private buildForm(): void {
    this.form = this.FORM_BUILDER.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      const email: string = this.form.controls["email"].value;
      this.recoveryEmail(email);
    }
  }

  //======================================================================

  public recoveryEmail(email: string): void {
    this.AUTH.recoveryEmail(email).subscribe(
      RESPONSE => {
        if (RESPONSE.body.errors) {
          const errors: string[] = RESPONSE.body.errors;
          for (let i = 0; i < errors.length; i++) {
            this.NOTIFY.setNotification({
              status: "danger",
              text: errors[i]
            });
          }
        } else {
          this.ROUTER.navigate(["auth/success", "email"]);
        }
      },
      ERROR => {
        this.NOTIFY.setNotification({
          status: "danger",
          // text:"Düzgün e-poçt daxil edin. Bu e-poçt üçün istifadəçi tapılmadı.",
          text: this._.instant("home.email_validation")
        });
      }
    );
  }

  //======================================================================

  public locationBack(): void {
    this.LOCATION.back();
  }
} //======================================================================
