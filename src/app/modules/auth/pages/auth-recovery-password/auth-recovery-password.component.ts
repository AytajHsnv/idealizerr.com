import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-auth-recovery-password",
  templateUrl: "./auth-recovery-password.component.html",
  styleUrls: ["./auth-recovery-password.component.scss"]
}) //======================================================================
export class AuthRecoveryPasswordComponent implements OnInit {
  //======================================================================

  constructor(
    private FORM_BUILDER: FormBuilder,
    private AUTH: AuthService,
    private ACTIVATED_ROUTE: ActivatedRoute,
    private NOTIFY: NotifyService,
    private ROUTER: Router,
    private _: TranslateService,
    private title: Title
  ) {
    this.AUTH.auth_page_location.next("recovery_password");
    this.buildForm();
  }

  //======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.your-new-pass')}`);
  }

  //======================================================================

  public form: FormGroup;
  private buildForm(): void {
    this.form = this.FORM_BUILDER.group({
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      const password: string = this.form.controls["password"].value;
      const key: string = this.ACTIVATED_ROUTE.snapshot.queryParams.key;
      this.recoveryPassword(password, key);
    }
  }

  //======================================================================

  public password_visible: boolean = false;
  public togglePasswordVisible(): void {
    this.password_visible = !this.password_visible;
  }

  //======================================================================

  private recoveryPassword(password: string, key: string): void {
    this.AUTH.recoveryPassword(password, key).subscribe(
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
          this.NOTIFY.setNotification({
            status: "success",
            // text:"Şifrəniz uğurla yeniləndi"
            text: this._.instant("home.password_success_validation")
          });
          this.ROUTER.navigate(["auth/login"]);
        }
      },
      ERROR => {
        this.NOTIFY.setNotification({
          status: "danger",
          // text:"Şifrənizin yenilənməsi zamanı problem yarandı!"
          text: this._.instant("home.password_validation")
        });
      }
    );
  }
} //======================================================================
