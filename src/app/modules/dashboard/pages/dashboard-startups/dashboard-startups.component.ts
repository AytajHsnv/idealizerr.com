import { Component, OnInit } from "@angular/core";
import { IStartup } from "src/app/modules/shared/models/models";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-dashboard-startups",
  templateUrl: "./dashboard-startups.component.html",
  styleUrls: ["./dashboard-startups.component.scss"]
}) //======================================================================
export class DashboardStartupsComponent implements OnInit {
  //======================================================================

  constructor(
    private CORE: CoreService,
    private DASHBOARD: DashboardService,
    private _: TranslateService,
    private title: Title
  ) {
    this.getStartups();
  }

  //======================================================================

  ngOnInit() {
    this.DASHBOARD.title.next(this._.instant("home.startups"));
    this.title.setTitle(`Idealizerr - ${this._.instant('home.startups')}`);
  }

  //======================================================================

  public startups: IStartup[];
  private getStartups(): void {
    this.CORE.getMyStartups().subscribe(
      RESPONSE => {
        this.startups = RESPONSE.body;
      },
      ERROR => {}
    );
  }
} //======================================================================
