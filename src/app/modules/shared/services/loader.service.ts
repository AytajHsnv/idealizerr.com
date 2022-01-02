import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//======================================================================
@Injectable({
  providedIn: 'root'
})//======================================================================


export class LoaderService {
//======================================================================

  constructor() { }

//======================================================================

  public status = new BehaviorSubject<boolean>(false);

//======================================================================

  public show():void {
    this.status.next(true);
  }

//======================================================================

  public hide(time:number = 100):void {
    setTimeout(() => {
      this.status.next(false);
    }, time);
  }

}//======================================================================

