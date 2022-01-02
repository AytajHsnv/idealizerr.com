import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Subscription } from "rxjs";
import { TranslatePipe } from "@ngx-translate/core";
import {AuthService} from '../../../shared/services/auth.service';
//======================================================================
@Component({
  selector: "dashboard-sidebar",
  templateUrl: "./dashboard-sidebar.component.html",
  styleUrls: ["./dashboard-sidebar.component.scss"],
  providers: [TranslatePipe]
}) //======================================================================
export class DashboardSidebarComponent implements OnInit {
  //======================================================================

  constructor(
    private DASHBOARD: DashboardService,
    private CORE: CoreService,
    private tp: TranslatePipe,
    private auth: AuthService
  ) {}
  notificationsLength = 0;
  _notifications: Subscription;
  currentUser;
  //======================================================================

  ngOnInit() {
    this.auth.user.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    this.CORE.notifications.subscribe(data => {
      let length = 0;

      data.forEach(dt => {
        if (dt.read === "0") {
          length++;
        }
      });
      this.notificationsLength = length;
    });
  }
  ngOnDestroy() {
    if (this._notifications) {
      this._notifications.unsubscribe();
    }
  }

  //======================================================================

  public setTitle(title: string): void {}
} //======================================================================
