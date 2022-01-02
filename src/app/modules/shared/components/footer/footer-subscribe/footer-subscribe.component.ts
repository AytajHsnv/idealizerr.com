import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NotifyService } from "../../../services/notify.service";
import { CoreService } from "../../../services/core.service";
import { ICoreSettings } from "../../../models/models";
import { TranslateService } from "@ngx-translate/core";
//======================================================================
@Component({
  selector: "footer-subscribe",
  templateUrl: "./footer-subscribe.component.html",
  styleUrls: ["./footer-subscribe.component.scss"]
}) //======================================================================
export class FooterSubscribeComponent implements OnInit {
  //======================================================================

  constructor(
    public FORM_BUILDER: FormBuilder,
    private NOTIFY: NotifyService,
    private CORE: CoreService,
    private _: TranslateService
  ) {
    this.buildForm();
  }

  //======================================================================

  @Input("settings")
  public settings: ICoreSettings;

  //======================================================================

  ngOnInit() {}

  //======================================================================

  public form: FormGroup;
  private buildForm(): void {
    this.form = this.FORM_BUILDER.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.email
        ]
      ]
    });
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      const email: string = this.form.controls["email"].value;
      this.subscribeNewsWithEmail(email);
    }
  }

  public subscribeNewsWithEmail(email: string): void {
    this.CORE.subscribeNewsWithEmail(email).subscribe(
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
            text: this._.instant("home.news-subscribe-success")
          });
          this.form.reset();
        }
      },
      ERROR => {
        this.NOTIFY.setNotification({
          status: "danger",
          text: this._.instant("home.news-subscribe-error")
        });
      }
    );
  }
} //======================================================================
