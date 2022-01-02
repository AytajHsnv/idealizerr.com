import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { objectIsNull } from "src/app/modules/shared/services/utils.service";
import { AuthService } from "src/app/modules/shared/services/auth.service";
import { IUser } from "src/app/modules/shared/models/models";
//======================================================================
@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
//======================================================================
export class DashboardLayoutComponent implements OnInit {
  //======================================================================

  constructor(
    private CORE: CoreService,
    private router: Router,
    private DASHBOARD: DashboardService,
    private AUTH: AuthService
  ) {
    this.CORE.route.next("dashboard");
    this.subsTitle();
    this.subsUser();
  }
  private subs_title: Subscription;
  public title: string;
  private subsTitle(): void {
    this.subs_title = this.DASHBOARD.title.subscribe((title) => {
      this.title = title;
    });
  }
  private subs_user: Subscription;
  public user: IUser;
  private subsUser(): void {
    this.subs_user = this.AUTH.user.subscribe((user) => {
      if (!objectIsNull(user)) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  //======================================================================
  _routerEvents;
  ngOnInit() {
    this.getNotifications();
    this._routerEvents = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        this.getNotifications();
      }
  });

  }
  ngOnDestroy() {
    if (this._routerEvents) {
      this._routerEvents.unsubscribe();
    }
    this.subs_title.unsubscribe();
  }

  getNotifications() {
    this.CORE.getNotifications().subscribe((data) => {
      this.CORE.notifications.next(data.body);
    });
  }
} //======================================================================
