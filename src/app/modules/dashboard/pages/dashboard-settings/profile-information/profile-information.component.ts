import { Component, OnInit, Input } from "@angular/core";
import { IUser } from "src/app/modules/shared/models/models";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { environment } from "src/environments/environment";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
//======================================================================
@Component({
  selector: "dashboard-settings-profile-information",
  templateUrl: "./profile-information.component.html",
  styleUrls: ["./profile-information.component.scss"]
}) //======================================================================
export class ProfileInformationComponent implements OnInit {
  //======================================================================

  constructor(
    private AUTH: AuthService,
    private NOTIFY: NotifyService,
    private _: TranslateService
  ) {}

  //======================================================================

  @Input("user")
  public user: IUser;

  //======================================================================

  ngOnInit() {}

  //======================================================================

  public avatarUpload(e): void {
    let input = e.target;
    const formdata = new FormData();
    formdata.append("image", input.files[0], input.files[0].name);
    formdata.append("api_key", "abcd");
    this.AUTH.upoadUserPhoto(formdata).subscribe(
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
          this.getUserInfo();
          this.NOTIFY.setNotification({
            status: "success",
            text: this._.instant("dashboard.profile-image-success")
          });
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
            text: this._.instant("dashboard.profile-image-error")
          });
        }
      }
    );
  }

  //======================================================================

  public getUserInfo(): void {
    this.AUTH.getUserInfo().subscribe(
      RESPONSE => {
        this.AUTH.setUser(RESPONSE.body);
      },
      ERROR => {}
    );
  }
} //======================================================================
