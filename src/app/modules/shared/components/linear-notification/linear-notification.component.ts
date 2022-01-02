import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NotifyService } from "../../services/notify.service";
import { INotify } from "../../models/models";
import {
  objectIsNull,
  generateRandomString
} from "../../services/utils.service";
//======================================================================
@Component({
  selector: "linear-notification",
  templateUrl: "./linear-notification.component.html",
  styleUrls: ["./linear-notification.component.scss"]
})
//======================================================================
export class LinearNotificationComponent implements OnInit {
  //======================================================================

  constructor(private NOTIFY: NotifyService) {
    this._subscribeNotification();
  }

  //======================================================================

  public notifications: INotify[] = [];
  public notification_subs: Subscription;

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnDestroy(): void {
    this.notification_subs.unsubscribe();
  }

  //======================================================================

  private _subscribeNotification(): void {
    this.notification_subs = this.NOTIFY.notification.subscribe(
      notification => {
        if (!objectIsNull(notification)) {
          notification.id = generateRandomString(5);
          this.notifications.push(notification);
          if (!notification.hold) {
            this.autoHide(notification);
          }
        }
      }
    );
  }
  accept(notification) {
    this.NOTIFY.acceptNotification[notification.id].emit(notification);
    this.close(notification);
  }

  //======================================================================

  public close(notification: INotify): void {
    for (let i = 0; i < this.notifications.length; i++) {
      if (this.notifications[i].id == notification.id) {
        this.notifications.splice(i, 1);
        return;
      }
    }
  }

  //======================================================================

  public autoHide(notification: INotify): void {
    setTimeout(() => {
      this.close(notification);
    }, 6 * 1000);
  }
} //======================================================================
