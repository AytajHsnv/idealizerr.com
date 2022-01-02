import { Component, OnInit, Input } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-new-program",
  templateUrl: "./new-program.component.html",
  styleUrls: ["./new-program.component.scss"]
})
export class NewProgramComponent implements OnInit {
  @Input()
  startupId;

  programs: any[];

  constructor(private CORE: CoreService, private NOTIFY: NotifyService, private _: TranslateService) {}

  ngOnInit() {
    this.getPrograms();
  }
  joinProgram(item) {
    this.NOTIFY.setNotification({
      status: 'warning',
      hold: true,
      id: item.id,
      text: this._.instant("dashboard.sure-to-join-program", { programName: item.title })
    }).subscribe(
      data => {
      this.CORE.joinProgram({
        startup_id: this.startupId,
        program: item.title
      }).subscribe(data => {
        if (data.body.errors) {
          this.NOTIFY.setNotification({
            status: "danger",
            text: data.body.errors
          });
        } else {
          this.NOTIFY.setNotification({
            status: "success",
            text: this._.instant("dashboard.joined-program", { programName: item.title })
          });
        }
      });
      }
    );
  }
  getPrograms() {
    this.CORE.getPrograms(this.startupId).subscribe(data => {
      this.programs = data.body;
    });
  }
}
