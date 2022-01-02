import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-new-video-form",
  templateUrl: "./new-video-form.component.html",
  styleUrls: ["./new-video-form.component.scss"]
})
export class NewVideoFormComponent implements OnInit {
  @Input()
  startupId;
  @Input()
  detail;
  constructor(
    private SANITIZER: DomSanitizer,
    private CORE: CoreService,
    private NOTIFY: NotifyService,
    private _: TranslateService
  ) {}
  disable;
  videoLink = "";
  accepted;
  waiting;
  rejected;
  sanitizedLink;

  ngOnInit() {
    if (this.detail.startup.video_confirmation === 0) {
      // this.disable = true;
      this.waiting = true;
      this.videoLink = this.detail.startup.video;
      this.sanitizedLink = this.SANITIZER.bypassSecurityTrustResourceUrl(
        this.detail.startup.video
      );
    }
    if (this.detail.startup.video_confirmation === 1) {
      this.disable = true;
      this.accepted = true;
      this.videoLink = this.detail.startup.video;
      this.sanitizedLink = this.SANITIZER.bypassSecurityTrustResourceUrl(
        this.detail.startup.video
      );
    }
  }
  showLink: boolean;

  youtubeLink: SafeResourceUrl = "";
  link = "";

  sanitize(src) {
    return this.SANITIZER.bypassSecurityTrustResourceUrl(src);
  }
  submitForm() {
    this.CORE.createVideoLink(this.startupId, this.link).subscribe(data => {
      if (data.body.errors) {
        this.NOTIFY.setNotification({
          status: 'danger',
          text: data.body.errors
        });
        return;
      }
      this.youtubeLink = null;
      if (data.body.startup.video_confirmation === 0) {
        // this.disable = true;
        this.waiting = true;
        this.videoLink = data.body.startup.video;
        this.sanitizedLink = this.SANITIZER.bypassSecurityTrustResourceUrl(
          data.body.startup.video
        );
      }
      this.NOTIFY.setNotification({
        status: "success",
        text: this._.instant("dashboard.video-added")
      });
    }, error => {

      if (error.error.errors) {
        this.NOTIFY.setNotification({
          status: 'danger',
          text: error.error.errors
        });
      } else {
        this.NOTIFY.setNotification({
          status: 'danger',
          text: "Bilinməyən xəta"
        });
      }
    });
  }

  onYoutubeLinkChange(val) {
    delete this.sanitizedLink;
    const isYoutube = val.match(
      /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    );
    if (isYoutube) {
      const matches = val.match(
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      );
      if (matches) {
        this.showLink = true;
        this.link = "https://www.youtube.com/embed/" + matches[2];
        this.youtubeLink = this.sanitize(
          "https://www.youtube.com/embed/" + matches[2]
        );
      } else {
        this.showLink = false;
      }
    } else {
      this.showLink = false;
    }
  }
}
