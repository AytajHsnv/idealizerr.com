import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { IPlan } from "src/app/modules/shared/models/models";
//======================================================================
@Component({
  selector: "core-competition-plans-section",
  templateUrl: "./core-competition-plans-section.component.html",
  styleUrls: ["./core-competition-plans-section.component.scss"],
})
//======================================================================
export class CoreCompetitionPlansSectionComponent implements OnInit {
  //======================================================================

  constructor() {}

  //======================================================================

  @Input("plans")
  public plans: any[];

  //======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if (this.plans) {
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
  }

  //======================================================================

  ngOnInit() {}
} //======================================================================
