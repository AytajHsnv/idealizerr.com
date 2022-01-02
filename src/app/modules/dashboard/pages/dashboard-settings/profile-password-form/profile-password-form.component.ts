import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { IUser } from "src/app/modules/shared/models/models";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
//======================================================================
@Component({
  selector: "dashboard-settings-profile-password-form",
  templateUrl: "./profile-password-form.component.html",
  styleUrls: ["./profile-password-form.component.scss"]
}) //======================================================================
export class ProfilePasswordFormComponent implements OnInit {
  //======================================================================

  constructor(
    private FORM: FormBuilder,
    private AUTH: AuthService,
    private NOTIFY: NotifyService,
    private _: TranslateService
  ) {
    this.buildForm();
  }

  //======================================================================

  @Input("user")
  public user: IUser;

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnDestroy(): void {
    this.subs_form_value.unsubscribe();
  }

  //======================================================================

  public form: FormGroup;
  private buildForm(): void {
    this.form = this.FORM.group({
      password: [null, [Validators.required, Validators.minLength(6)]],
      new_password: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.changesDedected();
  }

  //======================================================================

  public password_visible: boolean = false;
  public togglePasswordVisible(): void {
    this.password_visible = !this.password_visible;
  }

  //======================================================================

  public new_password_visible: boolean = false;
  public toggleNewPasswordVisible(): void {
    this.new_password_visible = !this.new_password_visible;
  }

  //======================================================================

  public submitForm(): void {
    let BODY = {};
    BODY["password"] = this.form.controls["password"].value;
    BODY["new_password"] = this.form.controls["new_password"].value;
    this.AUTH.updateUserPassword(BODY).subscribe(
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
            text: this._.instant("dashboard.password-renew-success")
          });
          this.form_value_changed = false;
          this.form.reset();
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
            text: this._.instant("dashboard.password-renew-error")
          });
        }
      }
    );
  }

  //======================================================================

  private subs_form_value: Subscription;
  public form_value_changed: boolean = false;
  public changesDedected(): void {
    this.subs_form_value = this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.form_value_changed = true;
      } else {
        this.form_value_changed = false;
      }
    });
  }
} //======================================================================
