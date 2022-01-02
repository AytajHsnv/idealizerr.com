import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { Subscription } from "rxjs";
import { IUser } from "src/app/modules/shared/models/models";
import { objectIsNull } from "src/app/modules/shared/services/utils.service";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-dashboard-settings",
  templateUrl: "./dashboard-settings.component.html",
  styleUrls: ["./dashboard-settings.component.scss"]
}) //======================================================================
export class DashboardSettingsComponent implements OnInit {
  //======================================================================

  constructor(
    private AUTH: AuthService,
    private DASHBOARD: DashboardService,
    private _: TranslateService,
    private title: Title
  ) {
    this.subsUser();
  }

  //======================================================================

  ngOnInit() {
    this.DASHBOARD.title.next(this._.instant("dashboard.settings"));
    this.title.setTitle(`Idealizerr - ${this._.instant('dashboard.settings')}`);
  }

  //======================================================================

  ngOnDestroy(): void {
    this.subs_user.unsubscribe();
  }

  //======================================================================

  private subs_user: Subscription;
  public user: IUser;
  private subsUser(): void {
    this.subs_user = this.AUTH.user.subscribe(user => {
      if (!objectIsNull(user)) {
        this.user = user;
      }
    });
  }
} //======================================================================
