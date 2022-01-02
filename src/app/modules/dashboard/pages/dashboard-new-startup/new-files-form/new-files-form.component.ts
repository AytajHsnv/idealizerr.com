import { Component, OnInit, Input } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-new-files-form",
  templateUrl: "./new-files-form.component.html",
  styleUrls: ["./new-files-form.component.scss"]
})
export class NewFilesFormComponent implements OnInit {
  @Input()
  startupId;
  @Input()
  detail;

  uploaded = [];
  constructor(
    private CORE: CoreService,
    private NOTIFY: NotifyService,
    private _: TranslateService
  ) {}

  ngOnInit() {
  }
  addFiles(files) {
    files.click();
  }
  deleteFile(item) {

    this.uploaded = this.uploaded.filter(el => el !== item);
  }
  submitFiles() {
    const formData = new FormData();
    this.uploaded.forEach(fl => {
      formData.append("files[]", fl);
    });
    this.CORE.createFiles(this.startupId, formData).subscribe(
      data => {
        this.NOTIFY.setNotification({
          status: "success",
          text: this._.instant("dashboard.files-added")
        });
        this.uploaded = [];
        this.detail.files = data.body.files;
      },
      error => {
        if (error.error) {
          if (error.error.errors) {
            for (let key in error.error.errors) {
              this.NOTIFY.setNotification({
                status: "danger",
                text: error.error.errors[key][0]
              });
            }
          }
        }
      }
    );
  }
  removeFile(item) {
    this.NOTIFY.setNotification({
      hold: true,
      status: "warning",
      text: `${item.title} ${this._.instant("dashboard.is-delete")}`
    }).subscribe(data => {
      this.CORE.removeFile(item.id).subscribe(data => {
        if (data.body.errors) {
          this.NOTIFY.setNotification({
            status: "danger",
            text: data.body.errors
          });
          return;
        }
        this.detail.files = data.body.files;
        this.NOTIFY.setNotification({
          status: "success",
          text: this._.instant("dashboard.files-deleted")
        });
      });
    });
  }
  uploadFiles(files) {
    if (files.length) {
      this.uploaded = [...this.uploaded, ...[].slice.call(files)];
    }
  }
}
