import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "src/app/modules/shared/models/models";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
//======================================================================
@Component({
  selector: "dashboard-settings-profile-mobile-number-form",
  templateUrl: "./profile-mobile-number-form.component.html",
  styleUrls: ["./profile-mobile-number-form.component.scss"],
  providers: [TranslatePipe]
}) //======================================================================
export class ProfileMobileNumberFormComponent implements OnInit {
  //======================================================================

  constructor(
    private AUTH: AuthService,
    private NOTIFY: NotifyService,
    private _: TranslateService,
    private tp: TranslatePipe
  ) {}

  //======================================================================

  @Input("user")
  public user: IUser;

  //======================================================================

  ngOnInit() {}

  l(property, ...args) {
    this.tp.transform(property, ...args);
  }

  //======================================================================

  public form_value_changed: boolean = false;
  public number: string;
  public mobileNumberInputChange(number: string): void {
    if (this.user.user_phone != number && number.length) {
      this.form_value_changed = true;
      this.number = number;
    } else {
      this.form_value_changed = false;
    }
  }

  //======================================================================

  public submitForm(): void {
    if (this.form_value_changed) {
      this.AUTH.updateUserMobileNumber(this.number).subscribe(
        RESPONSE => {
          if (RESPONSE.body.errors) {
            const errors: string[] = RESPONSE.body.errors;
            for (let i = 0; i < errors.length; i++) {
              this.NOTIFY.setNotification({
                status: "danger",
                text: errors[i]
              });
            }
            this.form_value_changed = false;
          } else {
            this.NOTIFY.setNotification({
              status: "success",
              text: this._.instant("dashboard.mobile-renew-success")
            });
            this.form_value_changed = false;
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
              text: this._.instant("dashboard.mobile-renew-error")
            });
          }
          this.form_value_changed = false;
        }
      );
    }
  }
} //======================================================================
