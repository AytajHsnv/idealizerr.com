import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IStartup } from "../../models/models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "../../services/core.service";
import { NotifyService } from "../../services/notify.service";
//======================================================================
@Component({
  selector: "startup-card-form",
  templateUrl: "./startup-card-form.component.html",
  styleUrls: ["./startup-card-form.component.scss"]
}) //======================================================================
export class StartupCardFormComponent implements OnInit {
  //======================================================================

  //======================================================================

  @Input("startup")
  public startup: IStartup;

  @Input("class")
  public class: string;
  @Input()
  detail;

  @Input()
  public new;

  redirection;

  //======================================================================

  ngOnInit() {
    this.redirection = [];
  }
  joinCompetition() {
    this.CORE.joinCompetition(this.detail.id).subscribe(data => {
      if (data.body.errors) {
      } else {
        this.NOTIFY.setNotification({
          text: "Müsabiqədə iştirakınız üçün sorğu göndərildi",
          status: "success"
        });
        this.detail.canjoincompetition = false;
      }
    });
  }

  selectFile(logo) {
    logo.click();
  }
  logoChange($event, title) {
    if ($event.target.files.length) {
      const selectedFile = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (title === "image") {
          this.CORE.image.next({
            title,
            file: selectedFile
          });
          this.startup.cover_image = event.target.result as string;
        } else {
          this.CORE.logo.next({
            title,
            file: selectedFile
          });
          this.startup.image = event.target.result as string;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  constructor(
    private AUTH: AuthService,
    private ROUTER: Router,
    private CORE: CoreService,
    private NOTIFY: NotifyService
  ) {
    CORE.logo.next("");
    CORE.image.next("");
  }
} //======================================================================
