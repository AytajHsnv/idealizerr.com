import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { INotify } from "../models/models";
@Injectable({ providedIn: "root" })
//======================================================================
export class NotifyService {
  //======================================================================

  constructor() {}

  //======================================================================

  public notification = new BehaviorSubject<INotify>({} as any);
  public acceptNotification = {};
  //======================================================================

  public setNotification(notification: INotify) {
    this.notification.next(notification);
    this.acceptNotification[notification.id] = new EventEmitter();
    return this.acceptNotification[notification.id];
  }
} //======================================================================
