import { Component, OnInit, SimpleChanges } from "@angular/core";
import { IPlan } from "../../models/models";
import { objectIsNull } from "../../services/utils.service";
import { CoreService } from "../../services/core.service";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
})
export class TimelineComponent {
  constructor(private CORE: CoreService) {}

  public plans: any[];
  subs_competition;

  ngOnInit() {
    this.subs_competition = this.CORE.competition.subscribe((competition) => {
      if (!objectIsNull(competition)) {
        this.plans = competition.action_plans;
        var last_en_index: number;
        for (let i = 0; i < this.plans.length; i++) {
          switch (this.plans[i].action_title) {
            case "Qeydiyyat":
              this.plans[i].action_key = "global.signup";
              break;
            case "Yoxlama":
              this.plans[i].action_key = "global.verification";
              break;
            case "Səsvermə":
              this.plans[i].action_key = "global.vote";
              break;
            case "Juri səsverməsi":
              this.plans[i].action_key = "dashboard.voice-jury";
              break;
            case "Final mərhələ":
              this.plans[i].action_key = "global.final_round";
              break;
            default:
              break;
          }
          if (this.plans[i].status == "1") {
            this.plans[i].status_front = "passed";
            last_en_index = i;
          } else {
            if (last_en_index + 1 == i) {
              this.plans[i].status_front = "active";
            } else {
              this.plans[i].status_front = "waiting";
            }
          }
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.subs_competition.unsubscribe();
  }
}
