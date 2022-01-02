import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IOption, IUser } from "src/app/modules/shared/models/models";
import { variables } from "src/environments/variables";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";
//======================================================================
@Component({
  selector: "dashbaord-settings-profile-information-form",
  templateUrl: "./profile-information-form.component.html",
  styleUrls: ["./profile-information-form.component.scss"]
}) //=====================================================================
export class ProfileInformationFormComponent implements OnInit {
  //======================================================================

  constructor(
    private FORM: FormBuilder,
    private AUTH: AuthService,
    private NOTIFY: NotifyService,
    private _: TranslateService
  ) {
    this.gender_options = variables.select.gender_options;
    this.buildForm();
  }

  //======================================================================

  public gender_options: IOption[];
  public user_gender_option: IOption;
  public user_birthday: Date;

  //======================================================================

  @Input("user")
  public user: IUser;

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.form.controls["name"].setValue(this.user.name);
      this.form.controls["surname"].setValue(this.user.surname);
      if (this.user.user_gender) {
        for (let i = 0; i < this.gender_options.length; i++) {
          if (this.gender_options[i].value == this.user.user_gender) {
            this.user_gender_option = this.gender_options[i];
            this.form.controls["gender"].setValue(
              this.user_gender_option.value
            );
          }
        }
      }
      if (this.user.user_birthday) {
        if (this.user.user_birthday > 0) {
          this.user_birthday = new Date(this.user.user_birthday * 1000);
        } else {
          this.user_birthday = new Date(this.user.user_birthday);
        }
        this.form.controls["birthday"].setValue(this.user.user_birthday);
      }
    }
  }

  //======================================================================

  ngOnDestroy(): void {
    this.subs_form_value.unsubscribe();
  }

  //======================================================================

  public form: FormGroup;
  private buildForm(): void {
    this.form = this.FORM.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      gender: [null, []],
      birthday: [null, []]
    });
    this.changesDedected();
  }

  //======================================================================

  public submitForm(): void {
    if (this.form.valid) {
      let info = {};
      info["name"] = this.form.controls["name"].value;
      info["surname"] = this.form.controls["surname"].value;
      info["birthday"] = this.form.controls["birthday"].value;
      info["gender"] = this.form.controls["gender"].value;
      this.AUTH.updateUserInfo(info).subscribe(
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
            this.getUser();
            this.form_value_changed = false;
            this.NOTIFY.setNotification({
              status: "success",
              text: this._.instant("dashboard.info-renew-success")
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
              text: this._.instant("dashboard.info-renew-error")
            });
          }
        }
      );
    }
  }

  //======================================================================

  private getUser(): void {
    this.AUTH.getUserInfo().subscribe(
      RESPONSE => {
        this.AUTH.setUser(RESPONSE.body);
      },
      ERROR => {}
    );
  }

  //======================================================================

  public genderSelectChange(option: IOption): void {
    this.user_gender_option = option;
    this.form.controls["gender"].setValue(option.value);
  }

  //======================================================================

  public datepicker_end_date: Date = new Date();
  public datepickerValueChange(value: Date): void {
    this.user_birthday = value;
    if (((value.getTime() / 1000) | 0) > 0) {
      this.form.controls["birthday"].setValue((value.getTime() / 1000) | 0);
    } else {
      this.form.controls["birthday"].setValue(value.getTime());
    }
  }

  //======================================================================

  private subs_form_value: Subscription;
  public form_value_changed: boolean = false;
  public changesDedected(): void {
    this.subs_form_value = this.form.valueChanges.subscribe(value => {
      if (
        this.user.name != this.form.controls["name"].value ||
        this.user.surname != this.form.controls["surname"].value ||
        this.user.user_birthday != this.form.controls["birthday"].value ||
        this.user.user_gender != this.form.controls["gender"].value
      ) {
        this.form_value_changed = true;
      } else {
        this.form_value_changed = false;
      }
    });
  }
} //======================================================================
