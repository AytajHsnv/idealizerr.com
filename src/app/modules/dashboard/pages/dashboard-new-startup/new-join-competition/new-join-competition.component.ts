import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";

@Component({
  selector: "new-join-competition",
  templateUrl: "new-join-competition.component.html",
  styleUrls: ["./new-join-competition.component.scss"]
})
export class NewJoinCompetitionComponent implements OnInit {
  @Input() detail: any;
  @Output() joined = new EventEmitter<any>();
  constructor(
    private CORE: CoreService,
    private NOTIFY: NotifyService
  ) {}
  ngOnInit() {}

  joinCompetition() {
    this.CORE.joinCompetition(this.detail.id).subscribe(data => {
      if (data.body.errors) {
      } else {
        this.NOTIFY.setNotification({
          text: "Müsabiqədə iştirakınız üçün sorğu göndərildi",
          status: "success"
        });
        this.joined.emit(true);
        this.detail.canjoincompetition = false;
      }
    });
  }
}
