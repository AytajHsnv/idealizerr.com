import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { IStartup } from "src/app/modules/shared/models/models";
//======================================================================
@Component({
  selector: "core-main-startups-section",
  templateUrl: "./core-main-startups-section.component.html",
  styleUrls: ["./core-main-startups-section.component.scss"],
}) //======================================================================
export class CoreMainStartupsSectionComponent implements OnInit {
  //======================================================================

  constructor(public CORE: CoreService) {}

  //======================================================================

  public selected_filter: string = "liked";
  public startups = {
    new: [],
    liked: [],
  };

  //======================================================================

  ngOnInit() {
    this._getStartups_API();
  }

  //======================================================================

  public filter(type: string): void {
    if (type === "new") {
      this._getHomeMembers();
    } else if (type === "liked") {
      this._getStartups_API();
    }
    this.startups[type] = [];
    this.selected_filter = type;
  }

  //======================================================================

  private _getStartups_API(): void {
    this.CORE.getStartups().subscribe(
      (RESPONSE) => {
        this.startups[this.selected_filter] = RESPONSE.body;
      },
      (ERROR) => {}
    );
  }
  private _getHomeMembers(): void {
    this.CORE.getHomeMembers().subscribe(
      (RESPONSE) => {
        this.startups[this.selected_filter] = RESPONSE.body;
      },
      (ERROR) => {}
    );
  }
} //======================================================================
