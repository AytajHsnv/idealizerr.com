import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
import { Router } from '@angular/router';
//======================================================================
@Component({
  selector: "app-dashboard-notifications",
  templateUrl: "./dashboard-notifications.component.html",
  styleUrls: ["./dashboard-notifications.component.scss"]
}) //======================================================================
export class DashboardNotificationsComponent implements OnInit {
  //======================================================================

  constructor(
    private DASHBOARD: DashboardService,
    private CORE: CoreService,
    private _: TranslateService,
    private title: Title,
    private ROUTER: Router
  ) {}
  notifications = [];
  notificationsLength = 0;
  _notifications: Subscription;
  //======================================================================
  navigate(item){
    if (item.startup_id) {
      this.ROUTER.navigate(["dashboard/new/startup/" + item.startup_id]);
    }
  }
  ngOnInit() {
    this.DASHBOARD.title.next(this._.instant("dashboard.notifications"));
    this.title.setTitle(`Idealizerr - ${this._.instant('dashboard.notifications')}`);
    this.getNotifications();
  }
  getNotifications() {
    this.CORE.getNotifications().subscribe(data => {
      this._notifications = this.CORE.notifications.subscribe(data => {
        this.notifications = data;
        let length = 0;
        data.forEach(dt => {
          if (dt.read === "0") {
            length++;
          }
        });
        this.notificationsLength = length;
      });

      this.CORE.notifications.next(data.body);

      this.CORE.readNotifications().subscribe(data => {
      });
    });
  }
  ngOnDestroy() {
    if (this._notifications) {
      this._notifications.unsubscribe();
    }
  }
} //======================================================================
