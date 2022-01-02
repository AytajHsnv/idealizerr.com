import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { ILogin } from "src/app/modules/shared/models/models";
import { Router } from "@angular/router";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-auth-login",
  templateUrl: "./auth-login.component.html",
  styleUrls: ["./auth-login.component.scss"]
}) //======================================================================
export class AuthLoginComponent implements OnInit {
  //======================================================================

  constructor(
    private FORM_BUILDER: FormBuilder,
    private AUTH: AuthService,
    private ROUTER: Router,
    private NOTIFY: NotifyService,
    private _: TranslateService,
    private title: Title
  ) {
    this.AUTH.auth_page_location.next("login");
    this._buildForm();
  }

  //======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.signin')}`);
  }

  //======================================================================

  public form: FormGroup;
  private _buildForm(): void {
    this.form = this.FORM_BUILDER.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      const body: ILogin = {
        email: this.form.controls["email"].value,
        password: this.form.controls["password"].value
      };
      this._postLogin(body);
    }
  }

  //======================================================================

  public password_visible: boolean = false;
  public togglePasswordVisible(): void {
    this.password_visible = !this.password_visible;
  }

  //======================================================================

  private _postLogin(body: ILogin): void {
    this.AUTH.login(body).subscribe(
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
          this.AUTH.setUser(RESPONSE.body.user_detail);
          this.AUTH.setToken(RESPONSE.body.access_token);
          this.ROUTER.navigate(["dashboard"]);
        }
      },
      ERROR => {
        if (ERROR.error.errors) {
          const errors: string[] = ERROR.error.errors;
          for (let i = 0; i < errors.length; i++) {
            this.NOTIFY.setNotification({
              status: "danger",
              text: errors[i]
            });
          }
        } else {
          this.NOTIFY.setNotification({
            status: "danger",
            text: this._.instant("home.name_password_validation")
          });
        }
      }
    );
  }
} //======================================================================
