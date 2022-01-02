import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { ISignup } from "src/app/modules/shared/models/models";
import { Router } from "@angular/router";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-auth-signup",
  templateUrl: "./auth-signup.component.html",
  styleUrls: ["./auth-signup.component.scss"]
}) //======================================================================
export class AuthSignupComponent implements OnInit {
  //======================================================================

  constructor(
    private FORM_BUILDER: FormBuilder,
    private AUTH: AuthService,
    private ROUTER: Router,
    private NOTIFY: NotifyService,
    private _: TranslateService,
    private title: Title
  ) {
    this.AUTH.auth_page_location.next("signup");
    this._buildForm();
  }

  //======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.noaccsignup')}`);
  }

  mobileNumberInputChange($event) {
    this.form.get('phone_number').markAsTouched();
    this.form.get('phone_number').setValue($event);
  }

  //======================================================================

  public terms_display: boolean = false;
  public acceptTerms(): void {
    this.form.controls["terms_accepted"].setValue(true);
  }
  public closeTermsModal(): void {
    this.terms_display = false;
  }
  public openTermsModal(): void {
    this.terms_display = true;
  }

  //======================================================================

  public form: FormGroup;
  private _buildForm(): void {
    this.form = this.FORM_BUILDER.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      'password-confirm': [null, [Validators.required, Validators.minLength(6), this.passwordConfirming]],
      // current_competition: [false, []],
      terms_accepted: [false, [Validators.pattern("true")]]
    }, {validator: this.passwordConfirming});
  }

  //======================================================================

  public password_visible: boolean = false;
  public togglePasswordVisible(): void {
    this.password_visible = !this.password_visible;
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      const body: ISignup = {
        name: this.form.controls["name"].value,
        surname: this.form.controls["surname"].value,
        email: this.form.controls["email"].value,
        phone_number: this.form.controls["phone_number"].value,
        password: this.form.controls["password"].value,
        // current_competition: this.form.controls['current_competition'].value,
        terms_accepted: this.form.controls["terms_accepted"].value
      };
      this._postSignup(body);
    }
  }

  //======================================================================

  private _postSignup(body: ISignup): void {
    this.AUTH.signup(body).subscribe(
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
          this.ROUTER.navigate(["auth/success/signup"]);
        }
      },
      ERROR => {
        this.NOTIFY.setNotification({
          status: "danger",
          text: this._.instant("home.register_validation")
        });
      }
    );
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password') && c.get('password').value !== c.get('password-confirm').value) {
      return {invalid: true};
    }
}
} //======================================================================
